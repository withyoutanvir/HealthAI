Health AI
Health AI is a full-stack web application that leverages Machine Learning, OCR, and Natural Language Processing to provide real-time, AI-powered health predictions and precautionary recommendations based on user-provided symptoms.

Users can either enter text directly or upload a PDF document. The system performs OCR (if needed), processes the input, and uses a trained AI model to suggest likely conditions along with personalized precautions.

Live Demo
→ Try Health AI

Features
Symptom extraction from free text or PDF input (via OCR)

AI-powered disease prediction using multi-label classification

Real-time health recommendations based on predictions

Authentication and messaging system

Microservice architecture for scalable model inference

91%+ model accuracy on internal evaluation

Tech Stack
Frontend
React.js with Vite for fast and modern UI development

TailwindCSS for utility-first responsive styling

Backend
Node.js + Express for authentication and messaging APIs

Flask for serving the machine learning model (as a microservice)

MongoDB for user data and messaging

Machine Learning
Multi-label classification model trained on a symptom-to-disease dataset

Implemented using Hugging Face Transformers

Tesseract OCR integration for reading PDF inputs

health-ai/
│
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
│
├── server/                 # Node.js + Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middleware/
│
├── modelapi/               # Flask-based AI microservice
│   ├── model_server.py
│   └── model/              # Trained model files
│
├── assets/                 # Screenshots or static files (optional)
│
├── README.md
└── package.json

Setup & Installation
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/health-ai.git
cd health-ai
2. Setup the frontend (React)
bash
Copy
Edit
cd client
npm install
npm run dev
3. Setup the backend (Node.js)
bash
Copy
Edit
cd ../server
npm install
npm run start
4. Setup the model API (Flask)
bash
Copy
Edit
cd ../modelapi
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python model_server.py
Make sure the Flask server is running on the port expected by the Node.js API or frontend.

Usage
Visit the Live Demo or run locally.

Login or register.

Enter your symptoms as text or upload a PDF.

The system will analyze the input and display:

Predicted health conditions

Suggested precautions


