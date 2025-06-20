import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const AI_API_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';

// ✅ POST /api/analyze — handles both text and file
router.post('/', upload.single('file'), async (req, res) => {
  const hasFile = !!req.file;
  const hasText = !!req.body.text;

  if (!hasFile && !hasText) {
    return res.status(400).json({ error: 'No input provided' });
  }

  try {
    let aiRes;

    if (hasFile) {
      // Multipart request for file
      const form = new FormData();
      form.append('file', fs.createReadStream(req.file.path), req.file.originalname);

      aiRes = await axios.post(`${AI_API_URL}/analyze`, form, {
        headers: form.getHeaders(),
      });

      fs.unlinkSync(req.file.path); // Clean up
    } else {
      // JSON request for text
      aiRes = await axios.post(`${AI_API_URL}/analyze`, { text: req.body.text }, {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return res.json(aiRes.data);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path); // Clean up if present
    console.error('❌ Error contacting AI service:', err.message);
    if (err.response) {
      console.error('👉 AI response:', err.response.data);
    }
    return res.status(500).json({ error: 'AI service error', details: err.message });
  }
});

// ✅ Legacy fallback route (optional)
router.post('/predict', upload.single('file'), async (req, res) => {
  return res.redirect(307, '/api/analyze');
});

export default router;
