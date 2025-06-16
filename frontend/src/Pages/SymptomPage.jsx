import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ReportCard from "../components/ReportCard";
import axios from "axios";

const API_BASE_URL =  "http://localhost:5000";

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
      if (!pdfFile) {
        if (!symptomText.trim()) {
          setError("Please enter symptoms or upload a PDF.");
          setLoading(false);
          return;
        }

        const { data } = await axios.post(`${API_BASE_URL}/analyze`, {
          text: symptomText.trim(),
        });

        setExtractedText(symptomText);
        setPrediction(data.prediction);
      } else {
        setError("Please use the Analyze PDF button to analyze the uploaded file.");
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

      const { data } = await axios.post(`${API_BASE_URL}/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setExtractedText(data.extracted_text || "");
      setPrediction(data.prediction);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">AI Symptom Analyzer</h1>

      <textarea
        rows={5}
        value={symptomText}
        onChange={(e) => setSymptomText(e.target.value)}
        placeholder="Enter symptoms manually..."
        className="w-full max-w-2xl p-4 rounded bg-gray-800 border border-gray-700 mb-4 text-white"
      />

      <FileUpload
        onFileSelect={setPdfFile}
        onExtractedText={setExtractedText}
        onPrediction={setPrediction}
      />

      <button
        onClick={handleAnalyze}
        className="btn btn-primary mt-6 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Submit Symptoms"}
      </button>

      {pdfFile && (
        <button
          onClick={handlePdfAnalyze}
          className="btn btn-secondary mt-4 px-6 py-2 bg-green-600 rounded hover:bg-green-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Analyzing PDF..." : "Analyze PDF"}
        </button>
      )}

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {extractedText && (
        <div className="mt-6 w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-2">Extracted Text:</h2>
          <div className="bg-gray-800 p-4 rounded border border-gray-700 whitespace-pre-wrap">
            {extractedText}
          </div>
        </div>
      )}

      {prediction && (
        <div className="mt-6 w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-2">AI Prediction:</h2>
          <ReportCard report={prediction} />
        </div>
      )}
    </div>
  );
};

export default SymptomPage;
