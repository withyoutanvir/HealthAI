import re
from difflib import get_close_matches

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def get_disease_solution_map():
    return {
        "positive": "AI believes symptoms are not severe.",
        "negative": "AI believes symptoms could be severe. Please consult a doctor.",
        "flu": "Stay hydrated, rest, and take antivirals if prescribed.",
        "covid-19": "Isolate, monitor oxygen levels, and seek help if needed.",
        "diabetes": "Maintain a healthy diet, exercise, and monitor sugar levels.",
        "asthma": "Avoid allergens and use prescribed inhalers.",
        "hypertension": "Reduce salt, manage stress, and follow medication.",
        "heart disease": "Exercise moderately and follow cardiac diet.",
        "fever": "Monitor temperature, drink fluids, and rest. Seek help if fever persists.",
    }

def lookup_description(label):
    return get_disease_solution_map().get(label.lower(), "No medical advice available for this condition.")

def enrich_prediction(prediction, input_text=None):
    enriched = []

    # Custom keyword override if input text provided
    if input_text:
        keywords = list(get_disease_solution_map().keys())
        words = input_text.lower().split()

        for word in words:
            close_match = get_close_matches(word, keywords, n=1, cutoff=0.8)
            if close_match:
                matched = close_match[0]
                enriched.append({
                    "label": matched.upper(),
                    "score": 0.90,
                    "description": lookup_description(matched)
                })
                return enriched  # Prioritize keyword match over model if found

    # Default logic from model output
    if isinstance(prediction, str):
        enriched.append({"label": prediction, "description": lookup_description(prediction)})

    elif isinstance(prediction, list):
        for item in prediction:
            label = item.get("label") or item.get("labels")
            score = item.get("score", None)
            enriched.append({
                "label": label,
                "score": score,
                "description": lookup_description(label)
            })

    return enriched
