import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiService = {
  signup: (userData: any) => axios.post(`${API_BASE_URL}/signup`, userData),
  login: (userCredentials: any) => axios.post(`${API_BASE_URL}/login`, userCredentials),
  // Add more services as needed
};