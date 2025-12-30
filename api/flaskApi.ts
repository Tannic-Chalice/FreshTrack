import axios from 'axios';

// This MUST be localhost for your browser to reach the Docker container
export const API_BASE_URL = "https://mlop-408537457754.asia-south1.run.app"; 

export const uploadImageForPrediction = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.prediction;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

};








