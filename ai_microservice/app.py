import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

from opencv_python.pdf_img import convert_pdf_to_images
from processing.ocr import extract_text_from_image
from opencv_python.nlp_model import get_model_prediction
from utils.utils import clean_text, enrich_prediction

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    try:
        images = convert_pdf_to_images(file_path)
        extracted_text = ""

        for image in images:
            extracted_text += extract_text_from_image(image) + "\n"

        cleaned_text = clean_text(extracted_text)
        raw_prediction = get_model_prediction(cleaned_text)
        enriched = enrich_prediction(raw_prediction)

        return jsonify({
            "extracted_text": cleaned_text,
            "prediction": enriched
        })

    finally:
        # Clean up uploaded file after processing
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Warning: could not remove uploaded file: {e}")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
