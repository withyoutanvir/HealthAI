import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  // temporary storage

// Use environment variable with fallback
const AI_API_URL = process.env.AI_API_URL || 'http://localhost:5000';

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // Build a form to forward
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), req.file.originalname);

    // Forward request to AI microservice
    const aiRes = await axios.post(`${AI_API_URL}/predict`, form, {
      headers: form.getHeaders(),
    });

    // Clean up temp file
    fs.unlinkSync(req.file.path);

    // Send AI result back to frontend
    return res.json(aiRes.data);
  } catch (err) {
    // Clean up on error
    fs.unlinkSync(req.file.path);
    return res.status(500).json({ error: err.message || 'Something went wrong' });
  }
});

export default router;
