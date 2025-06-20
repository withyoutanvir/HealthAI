import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
  console.log("API_BASE:", API_BASE);

  const loginUser = async (email, password) => {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (!res.ok) throw new Error(data.message || "Login failed");
      return data;
    } catch {
      throw new Error("Invalid username or password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      navigate("/symptoms");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-tl from-[#1E90FF] via-[#32CD32] to-[#FFA07A] animate-fade-up">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-8 bg-white rounded-2xl shadow-xl backdrop-blur border border-white/30"
      >
        <h1 className="text-4xl font-extrabold text-center text-[#1E90FF] mb-6 tracking-wide">
          Welcome Back
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-[#1E90FF] font-semibold">Email</label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-[#1E90FF] font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-[#1E90FF] hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#1E90FF] hover:bg-[#32CD32] text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
