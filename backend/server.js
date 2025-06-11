import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import mongoose from 'mongoose';
import app from './index.js';

// CORS setup (dev-only: allow all origins)
app.use(cors());

// ✅ Use port 3000 to avoid conflict with Flask app.py
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Express server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
