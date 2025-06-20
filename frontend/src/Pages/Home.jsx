// Required dependencies:
// npm install framer-motion react-icons react-router-dom

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaBrain,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaQuestionCircle,
  FaCogs,
} from "react-icons/fa";

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Preloader = () => (
  <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-[#1E90FF] border-b-[#32CD32]"></div>
  </div>
);

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="bg-gradient-to-b from-white to-[#f2f2f2] text-[#333333] font-sans min-h-screen scroll-smooth">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1E90FF] to-[#32CD32] text-white p-5 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wider">Health AI</h1>
          <nav className="space-x-6 hidden md:flex">
            {["History", "About", "Features", "Testimonials", "Contact"].map((item, idx) => {
              const id = item.toLowerCase().replace(/ /g, "");
              return item === "History" ? (
                <Link
                  key={idx}
                  to="/history"
                  className="hover:text-yellow-100 transition duration-300 font-medium"
                >
                  {item}
                </Link>
              ) : (
                <a
                  key={idx}
                  href={`#${id}`}
                  className="hover:text-yellow-100 transition duration-300 font-medium"
                >
                  {item}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="bg-gradient-to-br from-[#1E90FF] via-[#32CD32] to-[#FFA07A] py-24 px-6 text-center"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={animationVariants}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur p-10 rounded-2xl inline-block shadow-xl border border-white/30"
        >
          <h2 className="text-5xl font-extrabold mb-4 text-[#1E90FF] tracking-wide leading-tight">
            Your Personal Health Assistant
          </h2>
          <p className="text-lg mb-6">AI-powered insights to help you live healthier, longer.</p>
          <Link to="/register">
            <button className="bg-[#1E90FF] hover:bg-[#32CD32] text-white px-8 py-3 rounded-lg transition text-lg shadow-md hover:shadow-xl">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Sections */}
      {["about", "features", "how", "faq", "testimonials"].map((id, index) => (
        <motion.section
          id={id}
          key={id}
          className="py-20 px-4 container mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          custom={index + 1}
        >
          {id === "about" && (
            <>
              <h3 className="text-4xl font-bold mb-6 text-center text-[#1E90FF]">About Health AI</h3>
              <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed">
                Health AI combines cutting-edge AI with intuitive tools to give you real-time diagnostics,
                intelligent recommendations, and complete control over your health data.
              </p>
            </>
          )}

          {id === "features" && (
            <>
              <h3 className="text-4xl font-bold mb-12 text-center text-[#1E90FF]">Key Features</h3>
              <div className="grid md:grid-cols-3 gap-10 text-center">
                {[
                  {
                    icon: <FaBrain className="text-5xl text-[#32CD32] mb-4 animate-bounce" />,
                    title: "Smart Diagnosis",
                    desc: "AI-powered real-time analysis based on your symptoms.",
                  },
                  {
                    icon: <FaHeartbeat className="text-5xl text-[#32CD32] mb-4 animate-bounce delay-200" />,
                    title: "Health Tracker",
                    desc: "Track vital signs, activity, and sleep easily.",
                  },
                  {
                    icon: <FaShieldAlt className="text-5xl text-[#32CD32] mb-4 animate-bounce delay-400" />,
                    title: "Secure Data",
                    desc: "Your health data is encrypted and fully under your control.",
                  },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 hover:scale-105"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animationVariants}
                    custom={i + 1}
                  >
                    {f.icon}
                    <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
                    <p>{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {id === "how" && (
            <>
              <h3 className="text-4xl font-bold mb-12 text-center text-[#1E90FF]">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {["Upload symptoms or reports", "AI analyzes data in real-time", "Receive insights instantly"].map(
                  (text, i) => (
                    <motion.div
                      key={i}
                      className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={animationVariants}
                      custom={i + 1}
                    >
                      <FaCogs className="text-4xl text-[#FFA07A] mb-4 mx-auto animate-spin-slow" />
                      <h4 className="text-xl font-semibold">Step {i + 1}</h4>
                      <p>{text}</p>
                    </motion.div>
                  )
                )}
              </div>
            </>
          )}

          {id === "faq" && (
            <>
              <h3 className="text-4xl font-bold mb-10 text-center text-[#1E90FF]">FAQs</h3>
              <div className="space-y-6 max-w-3xl mx-auto">
                {[
                  {
                    q: "Is my health data secure?",
                    a: "Yes. We use blockchain-grade encryption for full privacy.",
                  },
                  {
                    q: "Do I need medical knowledge?",
                    a: "No. Our app is simple and intuitive for anyone to use.",
                  },
                  {
                    q: "Is it free?",
                    a: "Yes, we offer both free and premium versions.",
                  },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    className="border-b pb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animationVariants}
                    custom={i + 1}
                  >
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-[#32CD32]">
                      <FaQuestionCircle /> {f.q}
                    </h4>
                    <p className="ml-6 mt-1">{f.a}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {id === "testimonials" && (
            <>
              <h3 className="text-4xl font-bold mb-12 text-center text-[#1E90FF]">What Users Say</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {[{ name: "Dr. Priya S.", text: "Accurate and easy-to-use platform." }, { name: "Ravi Mehta", text: "Feels like I have a doctor in my pocket." }].map(
                  (t, i) => (
                    <motion.div
                      key={i}
                      className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transform hover:scale-105"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={animationVariants}
                      custom={i + 1}
                    >
                      <p className="italic mb-4">"{t.text}"</p>
                      <h5 className="font-semibold text-[#32CD32]">{t.name}</h5>
                    </motion.div>
                  )
                )}
              </div>
            </>
          )}
        </motion.section>
      ))}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1E90FF] to-[#32CD32] text-white py-10 px-4">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex justify-center gap-6 text-xl">
            {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-orange-100 hover:scale-110 transition-transform">
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-sm">&copy; 2025 Health AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
