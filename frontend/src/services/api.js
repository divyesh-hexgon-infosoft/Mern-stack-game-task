import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Game API
export const saveGameResult = async (gameData) => {
  try {
    const res = await axios.post(`${API_URL}/game/results`, gameData);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to save game result'
    };
  }
};

export const getGameHistory = async () => {
  try {
    const res = await axios.get(`${API_URL}/game/history`);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to get game history'
    };
  }
};

export const getGameResult = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/game/results/${id}`);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to get game result'
    };
  }
};

// User API
export const updateProfile = async (formData) => {
  try {
    const res = await axios.put(`${API_URL}/users/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile'
    };
  }
};