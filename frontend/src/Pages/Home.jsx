import React from "react";
import { Link } from "react-router-dom";
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

const animationDelayClasses = [
  "delay-75",
  "delay-150",
  "delay-300",
  "delay-450",
  "delay-600",
];

const HomePage = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen scroll-smooth">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50 transition duration-500 ease-in-out transform hover:scale-105">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Health AI</h1>
          <nav className="space-x-6">
            {["Home", "About", "Features", "How It Works", "FAQ", "Testimonials", "Contact"].map(
              (item, idx) => (
                <a
                  key={idx}
                  href={`#${item.toLowerCase().replace(/ /g, "")}`}
                  className="hover:underline hover:text-blue-300 transition duration-300"
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="bg-blue-50 py-24 text-center px-4 bg-[url('/hero-bg.jpg')] bg-cover bg-center animate-fadeInUp"
        style={{ animationDuration: "1s" }}
      >
        <div className="bg-white/80 p-10 rounded-xl inline-block shadow-lg transform transition hover:scale-105 duration-500">
          <h2 className="text-5xl font-bold mb-4 text-blue-700">Your Personal Health Assistant</h2>
          <p className="text-lg mb-6">AI-powered insights to help you live healthier, longer.</p>
          <Link to="/register">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg shadow-md hover:shadow-xl">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 px-4 bg-white container mx-auto animate-fadeInUp"
        style={{ animationDuration: "1s", animationDelay: "0.2s" }}
      >
        <h3 className="text-3xl font-bold mb-6 text-center">About Health AI</h3>
        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          Health AI is a cutting-edge digital health platform that leverages artificial intelligence to
          provide real-time diagnostics, personalized health recommendations, and secure data management
          for individuals and medical professionals.
        </p>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-20 container mx-auto px-4 animate-fadeInUp"
        style={{ animationDuration: "1s", animationDelay: "0.3s" }}
      >
        <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: <FaBrain className="text-4xl text-blue-600 mb-4" />,
              title: "Smart Diagnosis",
              desc: "Real-time analysis based on your symptoms using AI and ML models.",
            },
            {
              icon: <FaHeartbeat className="text-4xl text-blue-600 mb-4" />,
              title: "Health Tracker",
              desc: "Monitor vitals, activity, and sleep through connected devices.",
            },
            {
              icon: <FaShieldAlt className="text-4xl text-blue-600 mb-4" />,
              title: "Secure Data",
              desc: "Your health data stays private, encrypted and under your control.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white border p-8 rounded-xl shadow hover:shadow-lg transition-transform duration-150 ease-linear transform hover:-translate-y-2 hover:scale-105 ${animationDelayClasses[index % animationDelayClasses.length]} animate-fadeInUp`}
              style={{ animationDuration: "1s" }}
            >
              {feature.icon}
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how"
        className="bg-blue-50 py-20 px-4 animate-fadeInUp"
        style={{ animationDuration: "1s", animationDelay: "0.4s" }}
      >
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              "Upload symptoms or reports",
              "AI analyzes data in real-time",
              "Get results & insights instantly",
            ].map((step, i) => (
              <div
                key={i}
                className={`bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform duration-150 ease-linear transform hover:-translate-y-2 hover:scale-105 ${animationDelayClasses[i % animationDelayClasses.length]} animate-fadeInUp`}
                style={{ animationDuration: "1s" }}
              >
                <FaCogs className="text-4xl text-blue-600 mb-4 mx-auto" />
                <h4 className="text-xl font-semibold">Step {i + 1}</h4>
                <p className="mt-2 text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-20 container mx-auto px-4 animate-fadeInUp"
        style={{ animationDuration: "1s", animationDelay: "0.5s" }}
      >
        <h3 className="text-3xl font-bold mb-10 text-center">FAQs</h3>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              q: "Is my health data secure?",
              a: "Absolutely. We use end-to-end encryption and decentralized storage for complete data privacy.",
            },
            {
              q: "Can I use it without medical knowledge?",
              a: "Yes. Our app is designed to be user-friendly and helpful for everyone.",
            },
            {
              q: "Is Health AI free to use?",
              a: "We offer both free and premium plans based on your needs.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className={`border-b pb-4 animate-fadeInUp ${animationDelayClasses[index % animationDelayClasses.length]}`}
              style={{ animationDuration: "1s" }}
            >
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <FaQuestionCircle className="text-blue-600" /> {faq.q}
              </h4>
              <p className="text-gray-600 ml-6 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="bg-gray-50 py-20 px-4 animate-fadeInUp"
        style={{ animationDuration: "1s", animationDelay: "0.6s" }}
      >
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">What Users Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr. Priya S.",
                text: "An excellent tool for both patients and clinicians. The AI suggestions are incredibly accurate.",
              },
              {
                name: "Ravi Mehta",
                text: "I feel more in control of my health than ever. The app is simple and effective.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-xl shadow text-center animate-fadeInUp ${animationDelayClasses[index % animationDelayClasses.length]}`}
                style={{ animationDuration: "1s" }}
              >
                <p className="italic mb-4">"{testimonial.text}"</p>
                <h5 className="font-semibold">{testimonial.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-blue-600 text-white py-10 px-4"
      >
        <div className="container mx-auto text-center space-y-4">
          <div className="flex justify-center gap-6 text-xl">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-300 transition">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-300 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-blue-300 transition">
              <FaInstagram />
            </a>
          </div>
          <p className="text-sm">&copy; 2025 Health AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
