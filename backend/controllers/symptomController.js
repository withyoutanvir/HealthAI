import Symptom from '../models/Symptom.js';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// Controller to handle both symptom text and optional PDF file uploads
export const submitSymptoms = async (req, res) => {
  //  get userId from JWT middleware, not from client
  const userId = req.userId;

  //  symptomsText comes in req.body (even with FormData)
  const { symptomsText } = req.body;

  let extractedText = '';
  let predictedConditions = [];

  try {
    if (req.file) {
      //  forward PDF file to Flask AI microservice
      const form = new FormData();
      form.append(
        'file',
        fs.createReadStream(req.file.path),
        req.file.originalname
      );

      const aiRes = await axios.post(
        'https://healthai-production-9a99.up.railway.app/analyze',
        form,
        { headers: form.getHeaders() }
      );

      extractedText = aiRes.data.text;
      predictedConditions = aiRes.data.prediction;

      // cleanup temp upload
      fs.unlinkSync(req.file.path);
    } else {
      //  no file: just send symptom text to NLP microservice
      const aiRes = await axios.post(
        'https://healthai-production-9a99.up.railway.app/predict',
        { text: symptomsText }
      );
      predictedConditions = aiRes.data.map(item => item.label || item);
    }

    //  save to MongoDB
    const symptomDoc = await Symptom.create({
      userId,
      symptomsText,
      extractedText,
      predictedConditions,
    });

    //  return extracted text + conditions
    return res.status(201).json({ extractedText, predictedConditions });
  } catch (err) {
    // cleanup on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('submitSymptoms error:', err);
    return res.status(500).json({ error: err.message });
  }
};
export const getUserSymptoms = async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await Symptom.find({ userId }).sort('-createdAt');
    return res.json(list);
  } catch (err) {
    console.error('getUserSymptoms error:', err);
    return res.status(500).json({ error: err.message });
  }
};
