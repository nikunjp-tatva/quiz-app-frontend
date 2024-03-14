import axios from 'axios';

const API_URL = 'http://localhost:3001/v1/auth/';

export async function login(email: string, password: string) {
  const response = await axios.post(API_URL + 'login', {
    email,
    password,
  });
  return response.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  role: string;
  technologies: string[];
}) {
  const response = await axios.post(API_URL + 'register', data);
  return response.data;
}

export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  const tokenStr = sessionStorage.getItem('token');
  if (tokenStr) return JSON.parse(tokenStr).token;
  else return null;
};

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

export const setUserSession = (token: string, user: any) => {
  sessionStorage.setItem('token', JSON.stringify(token));
  sessionStorage.setItem('user', JSON.stringify(user));
};
