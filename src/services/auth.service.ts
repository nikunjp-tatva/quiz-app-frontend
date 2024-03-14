import axios from 'axios';

const API_URL = 'http://localhost:3001/v1/auth/';

export async function login(email: string, password: string) {
  const response = await axios.post(API_URL + 'login', {
    email,
    password,
  });
  if (response.data.accessToken.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

export function logout() {
  localStorage.removeItem('user');
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  role: string;
  selectedTechnology: string[];
}) {
  const response = await axios.post(API_URL + 'register', data);
  if (response.data.accessToken.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
}
