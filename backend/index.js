import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env early (adjust path as needed)
dotenv.config({ path: path.join(__dirname, '../.env.development') });

// Now import other modules that depend on env vars
import express from 'express';
import cors from 'cors';
import analyzeRoutes from './routes/analyzeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());



// Use routes
app.use('/api/analyze', analyzeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/symptoms', symptomRoutes);

app.get('/', (req, res) => res.send('Welcome to the Health Tracker API'));

export default app;
