import axios from 'axios';

const API_URL = 'http://localhost:3001/v1/auth/';

export function login(email: string, password: string) {
  return axios
    .post(API_URL + 'register', {
      email,
      password,
    })
    .then((response: { data: { accessToken: { token: string } } }) => {
      if (response.data.accessToken.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
}

export function logout() {
  localStorage.removeItem('user');
}

export function register(
  name: string,
  email: string,
  password: string,
  role: string,
  selectedTechnology: string[]
) {
  return axios.post(API_URL + 'signup', {
    name,
    email,
    password,
    role,
    selectedTechnology,
  });
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
}
