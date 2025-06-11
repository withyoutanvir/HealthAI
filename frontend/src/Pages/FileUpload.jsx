import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { analyzePdf } from "../Services/symptomapi";

const FileUpload = ({ onFileSelect, onExtractedText, onPrediction }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setError("");
      if (onFileSelect) onFileSelect(file);
      
      // Clear previous outputs on new file select
      if (onExtractedText) onExtractedText("");
      if (onPrediction) onPrediction(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await analyzePdf(file);

      // Send results back to parent
      if (onExtractedText) onExtractedText(result.text);
      if (onPrediction) onPrediction(result.prediction);

    } catch (e) {
      setError(e.response?.data?.error || e.message || "Failed to analyze file.");
      if (onExtractedText) onExtractedText("");
      if (onPrediction) onPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 text-white">
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center justify-center w-80 h-48 border-2 border-dashed border-gray-600 rounded-lg bg-gray-900 hover:border-blue-500 hover:shadow-lg transition duration-300"
      >
        <FiUpload className="text-blue-400 text-5xl mb-4" />
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileName ? (
          <span className="font-semibold truncate max-w-xs" title={fileName}>
            {fileName}
          </span>
        ) : (
          <span className="text-gray-400 text-center select-none">
            Click to upload <br /> a PDF file
          </span>
        )}
      </label>

      <button
        onClick={handleUpload}
        className="mt-6 px-6 py-2 bg-blue-500 rounded hover:bg-blue-600 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze PDF"}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default FileUpload;
