import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Adjust if your API URL is different

export const getStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
