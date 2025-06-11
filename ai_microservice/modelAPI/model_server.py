from pathlib import Path
from flask import Flask, request, jsonify
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
from flask_cors import CORS
import PyPDF2
import io
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.utils import clean_text, enrich_prediction

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

MODEL_DIR = Path(__file__).parent.parent / "saved_model"

# Load tokenizer and model from local dir explicitly
tokenizer = AutoTokenizer.from_pretrained(str(MODEL_DIR), local_files_only=True)
model = AutoModelForSequenceClassification.from_pretrained(str(MODEL_DIR), local_files_only=True)

nlp_pipeline = pipeline(
    "text-classification",
    model=model,
    tokenizer=tokenizer,
    return_all_scores=True
)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' in request.files:
        file = request.files['file']
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
        if not text.strip():
            return jsonify({"error": "Empty PDF or no extractable text"}), 400
    else:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "No input provided. Upload a PDF file or provide text."}), 400
        text = data['text']
        if not text.strip():
            return jsonify({"error": "Empty text input"}), 400

    cleaned = clean_text(text)
    raw_results = nlp_pipeline(cleaned)
    predictions = raw_results[0] if isinstance(raw_results, list) else raw_results
    enriched = enrich_prediction(predictions)

    if not enriched:
        return jsonify({"message": "No diseases detected with confidence ≥ threshold."}), 200

    return jsonify({"diseases_detected": enriched}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)
