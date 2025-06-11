import express from 'express';
import multer from 'multer';
import { submitSymptoms, getUserSymptoms } from '../controllers/symptomController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), submitSymptoms);
router.get('/:userId', protect,getUserSymptoms);

export default router;
