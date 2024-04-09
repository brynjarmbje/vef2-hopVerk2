// path : src/services/apiService.ts
import axios from 'axios';

interface SignUpData {
  name: string;
  username: string;
  password: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiService = {
  signup: (userData: SignUpData) =>
    axios.post(`${API_BASE_URL}/signup`, userData),
  login: (userCredentials: LoginCredentials) =>
    axios.post(`${API_BASE_URL}/login`, userCredentials),
  // Add more services as needed
};

// export const apiService = {
//   signup: (userData: any) => axios.post(`${API_BASE_URL}/signup`, userData),
//   login: (userCredentials: any) =>
//     axios.post(`${API_BASE_URL}/login`, userCredentials),
//   // Add more services as needed
// };
