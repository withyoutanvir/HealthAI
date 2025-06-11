import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

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

      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default FileUpload;
