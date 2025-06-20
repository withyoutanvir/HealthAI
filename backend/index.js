// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root (HEalthai/.env or HEalthai/.env.production)
const envFile =
  process.env.NODE_ENV === 'production'
    ? '../.env.production'
    : '../.env.development';

dotenv.config({ path: path.join(__dirname, envFile) });


// Import routes
import analyzeRoutes from './routes/analyzeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/analyze', analyzeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/symptoms', symptomRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Health Tracker API');
});

export default app;
