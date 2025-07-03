import React, { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TwinklingStars = () => {
  const starRef = useRef();
  const numStars = 1000;

  const positions = useMemo(() => {
    const pos = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 2000;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (starRef.current) {
      const time = clock.getElapsedTime();
      const opacity = 0.5 + 0.5 * Math.sin(time * 2.0);
      starRef.current.material.opacity = opacity;
    }
  });

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={1.2}
        sizeAttenuation
        transparent
        opacity={1}
      />
    </points>
  );
};

const Scene = ({ scrollY }) => {
  useFrame(({ camera }) => {
    if (scrollY.current != null) {
      camera.position.z = 5 + scrollY.current * 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <TwinklingStars />
    </>
  );
};

const StarryBackground = ({ scrollY }) => (
  <Canvas
    id="bg-canvas"
    className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    style={{ position: 'fixed' }}
  >
    <Scene scrollY={scrollY} />
  </Canvas>
);

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollY = useRef(0);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const registerUser = async (name, email, password) => {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(text || 'Registration failed');

    try {
      return JSON.parse(text);
    } catch {
      throw new Error('Invalid response from server');
    }
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

  useEffect(() => {
    const onScroll = () => (scrollY.current = window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
      <Suspense fallback={<div />}> <StarryBackground scrollY={scrollY} /> </Suspense>

      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl"
        >
          <h1 className="text-4xl font-extrabold text-center text-[#1E90FF] mb-6 tracking-wide">
            Create Account
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-[#1E90FF] font-semibold">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-black"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-[#1E90FF] font-semibold">Email</label>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-black"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-[#1E90FF] font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-black"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-[#1E90FF] font-semibold">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-black"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#1E90FF] hover:bg-[#32CD32] text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
            <p className="text-center mt-2 text-sm text-white">
              Already have an account?{' '}
              <a href="/login" className="text-[#1E90FF] hover:underline font-medium">
                Login
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationForm;
