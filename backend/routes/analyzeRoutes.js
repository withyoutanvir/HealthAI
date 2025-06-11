import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  // temp storage

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // build a form to forward
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), req.file.originalname);

    // call your AI microservice
   const aiRes = await axios.post('http://localhost:5001/predict', form, {
  headers: form.getHeaders(),
});

    // cleanup temp file
    fs.unlinkSync(req.file.path);

    // send AI result back to frontend
    return res.json(aiRes.data);
  } catch (err) {
    // cleanup on error
    fs.unlinkSync(req.file.path);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
