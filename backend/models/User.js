import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  resetToken: { type: String },               // added for password reset
  resetTokenExpires: { type: Date },          // added for password reset
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);

