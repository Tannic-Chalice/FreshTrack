import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam'; // Import the webcam library
import styles from '../styles/check-freshness.module.css'; // Import the CSS module
import Header from '../components/header'; // Import Header component

const CheckFreshness: React.FC = () => {
  const [freshnessStatus, setFreshnessStatus] = useState<string>(''); // State to hold freshness status
  const webcamRef = useRef<any>(null); // Reference for the webcam

  // Function to capture the image from the webcam
  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // Capture image from webcam
      if (imageSrc) {
        try {
          // Send captured image to the backend (Flask API)
          const response = await fetch('http://localhost:5000/check-freshness', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: imageSrc, // Send the image as base64 string
            }),
          });

          const data = await response.json(); // Assuming the backend sends a JSON response

          if (response.ok) {
            // Display freshness status based on backend response
            setFreshnessStatus(data.message);
          } else {
            setFreshnessStatus('Error checking freshness. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          setFreshnessStatus('Failed to connect to backend.');
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <Header /> {/* Adding Header component here */}

      <h1 className={styles.title}>Check Freshness of Fruits & Vegetables</h1>
      <p className={styles.description}>
        Use the webcam to capture the fruit or vegetable, and our system will check its freshness in real-time.
      </p>

      <div className={styles.webcamContainer}>
        {/* Webcam feed displayed */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={{
            facingMode: "environment", // Use rear camera (if available)
          }}
        />
      </div>

      <div className={styles.buttonContainer}>
        {/* Capture image button */}
        <button onClick={captureImage} className={styles.captureButton}>
          Check Freshness
        </button>
      </div>

      {/* Display freshness status */}
      <div className={styles.resultContainer}>
        {freshnessStatus && <p className={styles.resultMessage}>{freshnessStatus}</p>}
      </div>
    </div>
  );
};

export default CheckFreshness;
