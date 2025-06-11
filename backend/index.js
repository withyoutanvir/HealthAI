import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import analyzeRoutes from './routes/analyzeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/analyze', analyzeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/symptoms', symptomRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Health Tracker API');
})


export default app;