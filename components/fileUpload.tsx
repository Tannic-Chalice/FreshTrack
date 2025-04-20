import React, { useState } from 'react';
import { uploadImageForPrediction } from '../api/flaskApi';
import styles from '../styles/FileUpload.module.css';  // Import the CSS module
import Header from '../components/header';  // Import Header component

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload an image first.");
      return;
    }
    setLoading(true);
    setError(null);
    setPrediction(null); // Clear previous prediction
    try {
      const predictionResult = await uploadImageForPrediction(file);
      setPrediction(predictionResult);  // Set the prediction result
    } catch (err) {
      setError("Failed to get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.fileUploadContainer}>
      <Header /> {/* Adding Header component here */}
      <h1>Upload Image for Freshness Prediction</h1>
      <form onSubmit={handleSubmit} className={styles.fileUploadForm}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit" className={styles.submitButton} disabled={loading}>
          Predict
        </button>
      </form>
      {loading && <p className={styles.loadingText}>Loading...</p>}
      {error && <p className={styles.errorText}>{error}</p>}
      {prediction && <p className={styles.text}><strong>Prediction: {prediction}</strong></p>}
    </div>
  );
};

export default FileUpload;