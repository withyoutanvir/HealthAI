import React, { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: send OTP, Step 2: verify OTP + reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setMessage('OTP sent to your email');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP + Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to reset password');
      setMessage('Password reset successful! You can now log in.');
      setStep(1);
      setEmail('');
      setOtp('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4" style={{ backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)" }}>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#1877F2] mb-4">
          {step === 1 ? 'Forgot Password' : 'Reset Password'}
        </h1>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text text-[#1877F2]">Email Address</span>
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full input input-bordered border-gray-300 focus:border-[#1877F2] focus:ring focus:ring-[#1877F2]/50"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-block bg-[#1877F2] hover:bg-[#155fcf] text-white font-semibold"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text text-[#1877F2]">OTP</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter OTP"
                className="w-full input input-bordered border-gray-300 focus:border-[#1877F2] focus:ring focus:ring-[#1877F2]/50"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text text-[#1877F2]">New Password</span>
              </label>
              <input
                type="password"
                required
                placeholder="Enter new password"
                className="w-full input input-bordered border-gray-300 focus:border-[#1877F2] focus:ring focus:ring-[#1877F2]/50"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
