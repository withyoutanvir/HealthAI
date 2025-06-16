import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  const registerUser = async (name, email, password) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.text();
    if (!res.ok) throw new Error(data || 'Registration failed');
    return JSON.parse(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await registerUser(name, email, password);
      setTimeout(() => navigate("/login"), 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-center text-[#1877F2]">Register</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full input input-bordered"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full input input-bordered"
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
              className="w-full input input-bordered"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-[#1877F2]">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block bg-[#1877F2] hover:bg-[#155fcf] text-white font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          <span className="block text-center mt-2">
            Already have an account?{" "}
            <a href="/login" className="text-[#1877F2] hover:underline font-medium">
              Login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
