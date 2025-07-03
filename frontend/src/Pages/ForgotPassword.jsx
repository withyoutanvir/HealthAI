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

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollY = useRef(0);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const onScroll = () => (scrollY.current = window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setMessage("OTP sent to your email");
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");
      setMessage("Password reset successful! You can now log in.");
      setStep(1);
      setEmail("");
      setOtp("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-black overflow-hidden font-sans">
      <Suspense fallback={<div />}> <StarryBackground scrollY={scrollY} /> </Suspense>

      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl font-extrabold text-center text-[#1E90FF] mb-6 tracking-wide">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h1>

          {message && <p className="text-green-600 text-center mb-4">{message}</p>}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block mb-2 text-[#1E90FF] font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#1E90FF] hover:bg-[#32CD32] text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block mb-2 text-[#1E90FF] font-semibold">OTP</label>
                <input
                  type="text"
                  required
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-[#1E90FF] font-semibold">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#1E90FF] hover:bg-[#32CD32] text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;