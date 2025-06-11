import API from './api';

// Upload and analyze a PDF file
export const analyzePdf = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await API.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return data;  // { text: "...", prediction: {...} }
};

// Submit symptom text (and optionally file) to backend
export const submitSymptoms = async (formData) => {
  const { data } = await API.post('/symptoms', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

// Fetch symptom history for a user
export const getUserSymptoms = async (userId) => {
  const { data } = await API.get(`/symptoms/${userId}`);
  return data;
};
