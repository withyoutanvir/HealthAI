import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Use dynamic backend URL for Vercel/production
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to reset password');

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{ backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)" }}
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#1877F2] mb-4">Reset Password</h1>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">Email</span>
            </label>
            <input
              type="email"
              required
              className="w-full input input-bordered"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">OTP</span>
            </label>
            <input
              type="text"
              required
              className="w-full input input-bordered"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">New Password</span>
            </label>
            <input
              type="password"
              required
              className="w-full input input-bordered"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New password"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">Confirm Password</span>
            </label>
            <input
              type="password"
              required
              className="w-full input input-bordered"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-block bg-[#1877F2] hover:bg-[#155fcf] text-white font-semibold"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
