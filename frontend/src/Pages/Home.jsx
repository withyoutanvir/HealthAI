// Required dependencies:
// npm install three @react-three/fiber @react-three/drei framer-motion react-icons react-router-dom

import React, { useEffect, useRef, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Preloader = () => (
  <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-[#1E90FF] border-b-[#32CD32]" />
  </div>
);

const Scene = ({ scrollY }) => {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    if (scrollY.current != null) {
      camera.position.z = 5 + scrollY.current * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={400} depth={100} count={10000} factor={10} fade speed={2} saturation={0.5} />
    </>
  );
};

const Hero3D = ({ scrollY }) => (
  <Canvas
    id="bg-canvas"
    className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    style={{ position: 'fixed' }}
  >
    <Scene scrollY={scrollY} />
  </Canvas>
);

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const onScroll = () => (scrollY.current = window.scrollY);
    window.addEventListener("scroll", onScroll);

    const updateHeight = () => {
      const bodyHeight = document.body.scrollHeight;
      const canvas = document.getElementById("bg-canvas");
      if (canvas) canvas.style.height = `${bodyHeight}px`;
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="relative text-white font-sans overflow-x-hidden min-h-[300vh] bg-black">
      <Suspense fallback={<div />}>
        <Hero3D scrollY={scrollY} />
      </Suspense>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1E90FF]">Health AI</h1>
        <nav className="hidden md:flex space-x-6 text-white">
          {["History", "About", "Features", "Testimonials", "Contact"].map((item, idx) => {
            const id = item.toLowerCase().replace(/ /g, "");
            return item === "History" ? (
              <Link key={idx} to="/history" className="hover:text-[#32CD32] font-medium transition">
                {item}
              </Link>
            ) : (
              <a key={idx} href={`#${id}`} className="hover:text-[#32CD32] font-medium transition">
                {item}
              </a>
            );
          })}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-40 pb-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-10 max-w-3xl"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#1E90FF] mb-4">
            Empowering Your Health
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            AI-driven insights and tools to transform your wellbeing.
          </p>
          <Link to="/register">
            <button className="bg-[#1E90FF] hover:bg-[#32CD32] text-white font-semibold px-8 py-3 rounded-xl transition shadow-lg">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-5xl mx-auto text-center z-10 relative">
        <h3 className="text-4xl font-bold text-[#1E90FF] mb-6">About Us</h3>
        <p className="text-lg text-gray-300">
          At Health AI, we believe technology should work hand-in-hand with healthcare. Our platform uses advanced AI to offer personalized health support that’s accessible, secure, and intuitive.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto text-center z-10 relative">
        <h3 className="text-4xl font-bold text-[#1E90FF] mb-12">Key Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {["AI-Powered Diagnosis", "Intelligent Tracking", "Data Privacy First"].map((title, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20"
            >
              <h4 className="text-xl font-semibold text-[#32CD32] mb-2">{title}</h4>
              <p className="text-gray-200">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, aliquid.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 max-w-4xl mx-auto text-center z-10 relative">
        <h3 className="text-4xl font-bold text-[#1E90FF] mb-10">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[{ name: "Priya S.", quote: "Health AI changed the way I manage my wellness." }, { name: "Ravi M.", quote: "Feels like I have a personal doctor in my pocket." }].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20"
            >
              <p className="italic text-gray-200">"{item.quote}"</p>
              <h5 className="mt-4 font-semibold text-[#32CD32]">- {item.name}</h5>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/20 py-10 px-4 z-10 relative">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex justify-center gap-6 text-xl text-[#1E90FF]">
            {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-[#32CD32] transition-transform">
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">&copy; 2025 Health AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
