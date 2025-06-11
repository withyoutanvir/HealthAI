import re

def clean_text(text):
    """
    Cleans OCR or extracted text by removing unwanted characters, multiple spaces, etc.
    """
    text = re.sub(r'\s+', ' ', text)  # replace multiple spaces/newlines with single space
    text = text.strip()
    return text

def get_disease_solution_map():
    """
    Return a dictionary mapping diseases to possible treatments or advice.
    """
    return {
        "diabetes": "Maintain blood sugar levels with a healthy diet, exercise, and medication as prescribed.",
        "asthma": "Use prescribed inhalers, avoid allergens, and monitor breathing regularly.",
        "flu": "Stay hydrated, rest, and take antivirals if prescribed.",
        "covid-19": "Isolate, monitor oxygen levels, stay hydrated, and seek medical help if symptoms worsen.",
        "hypertension": "Reduce salt intake, manage stress, and take medication regularly.",
        "heart disease": "Follow a cardiac diet, exercise moderately, and take prescribed meds.",
    }

def enrich_prediction(prediction_result):
    """
    Converts prediction labels into a more informative dictionary with solutions.
    """
    solution_map = get_disease_solution_map()
    enriched = []

    for item in prediction_result:
        label = item.get("label") or item.get("labels")  # based on model output format
        if isinstance(label, list):  # multi-label case
            for l in label:
                enriched.append({
                    "disease": l,
                    "confidence": item.get("score", 0),
                    "solution": solution_map.get(l.lower(), "Consult a medical professional.")
                })
        else:
            enriched.append({
                "disease": label,
                "confidence": item.get("score", 0),
                "solution": solution_map.get(label.lower(), "Consult a medical professional.")
            })

    return enriched
