import os
import requests
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from opencv_python.pdf_img import convert_pdf_to_images
from processing.ocr import extract_text_from_image
from utils.utils import clean_text, enrich_prediction

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Update this with your frontend domain if needed

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

AI_SERVICE_URL = os.getenv("AI_SERVICE_URL", "https://your-ai-microservice.onrender.com/predict")

@app.route('/analyze', methods=['POST'])
def analyze():
    extracted_text = ""

    if 'file' in request.files:
        file = request.files['file']
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        try:
            images = convert_pdf_to_images(file_path)
            for image in images:
                extracted_text += extract_text_from_image(image) + "\n"
        finally:
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Warning: could not remove uploaded file: {e}")
    else:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "No input provided"}), 400
        extracted_text = data['text']

    # Clean text
    cleaned_text = clean_text(extracted_text)

    # Call external AI microservice
    try:
        response = requests.post(AI_SERVICE_URL, json={"text": cleaned_text})
        if response.status_code != 200:
            return jsonify({"error": "AI service failed", "details": response.text}), 500
        raw_prediction = response.json()
    except Exception as e:
        return jsonify({"error": "Could not connect to AI service", "details": str(e)}), 500

    # Post-process
    enriched = enrich_prediction(raw_prediction, input_text=cleaned_text)

    return jsonify({
        "extracted_text": cleaned_text,
        "prediction": enriched
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
