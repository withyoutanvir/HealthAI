// Required dependencies:
// npm install framer-motion react-icons react-router-dom

import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ReportCard from "../components/ReportCard";
import axios from "axios";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/analyze`
  : "http://localhost:3000/api/analyze";

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const SymptomPage = () => {
  const [symptomText, setSymptomText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);
    setExtractedText("");

    try {
      if (!pdfFile && symptomText.trim()) {
        const { data } = await axios.post(
          API_BASE_URL,
          { text: symptomText.trim() },
          { headers: { "Content-Type": "application/json" } }
        );

        setExtractedText(data.extracted_text || symptomText);
        setPrediction(data.precautions || data);
      } else {
        setError("Please use the PDF button if you're uploading a file.");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePdfAnalyze = async () => {
    if (!pdfFile) {
      setError("Please upload a PDF file first.");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);
    setExtractedText("");

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);

      const { data } = await axios.post(API_BASE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setExtractedText(data.extracted_text || "");
      setPrediction(data.precautions || data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      className="min-h-screen bg-gradient-to-br from-[#1E90FF] via-[#32CD32] to-[#FFA07A] text-[#333333] px-4 py-12 flex flex-col items-center font-sans"
    >
      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg"
      >
        AI Symptom Analyzer
      </motion.h1>

      <motion.textarea
        custom={2}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        rows={5}
        value={symptomText}
        onChange={(e) => setSymptomText(e.target.value)}
        placeholder="Enter symptoms manually..."
        className="w-full max-w-2xl p-4 rounded-xl bg-white/80 border border-gray-300 mb-4 text-[#333333] shadow-lg"
      />

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        className="w-full max-w-2xl"
      >
        <FileUpload
          onFileSelect={setPdfFile}
          onExtractedText={setExtractedText}
          onPrediction={setPrediction}
        />
      </motion.div>

      <motion.button
        custom={4}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        onClick={handleAnalyze}
        className="mt-6 px-6 py-2 bg-[#1E90FF] rounded-xl hover:bg-[#32CD32] text-white transition-all duration-300 shadow-md hover:shadow-xl"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Submit Symptoms"}
      </motion.button>

      {pdfFile && (
        <motion.button
          custom={5}
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          onClick={handlePdfAnalyze}
          className="mt-4 px-6 py-2 bg-[#32CD32] rounded-xl hover:bg-[#1E90FF] text-white transition-all duration-300 shadow-md hover:shadow-xl"
          disabled={loading}
        >
          {loading ? "Analyzing PDF..." : "Analyze PDF"}
        </motion.button>
      )}

      {error && (
        <motion.p
          custom={6}
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="text-red-500 mt-4 bg-white/70 px-4 py-2 rounded shadow-lg"
        >
          {error}
        </motion.p>
      )}

      {extractedText && (
        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="mt-6 w-full max-w-2xl"
        >
          <h2 className="text-lg font-semibold mb-2 text-white">Extracted Text:</h2>
          <div className="bg-white/80 p-4 rounded-xl border border-gray-300 text-[#333333] whitespace-pre-wrap shadow-lg">
            {extractedText}
          </div>
        </motion.div>
      )}

      {prediction && (
        <motion.div
          custom={8}
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="mt-6 w-full max-w-2xl"
        >
          <h2 className="text-lg font-semibold mb-2 text-white">AI Precaution Advice:</h2>
          <ReportCard report={prediction} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SymptomPage;
