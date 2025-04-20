import axios from 'axios';

// URL of your Flask backend (update if needed)
const API_BASE_URL = "http://127.0.0.1:5000"; 

// Function to upload the image and get the prediction
export const uploadImageForPrediction = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.prediction;  // Return the prediction
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};