import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL; // ✅ ensure this matches your .env

  const loginUser = async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('name', data.name);
      navigate('/symptoms');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"
      }}
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#1877F2] mb-4">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full input input-bordered border-gray-300 focus:border-[#1877F2] focus:ring focus:ring-[#1877F2]/50"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered border-gray-300 focus:border-[#1877F2] focus:ring focus:ring-[#1877F2]/50"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <a href="/forgot-password" className="text-sm text-[#1877F2] hover:underline hover:text-[#155fcf] block mb-4 text-right">
            Forgot Password?
          </a>
          <div>
            <button type="submit" className="btn btn-block bg-[#1877F2] hover:bg-[#155fcf] text-white font-semibold">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
