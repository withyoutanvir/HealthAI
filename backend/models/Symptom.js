import mongoose from 'mongoose';

const symptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symptomsText: { type: String, required: true },
  predictedConditions: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Symptom', symptomSchema);
