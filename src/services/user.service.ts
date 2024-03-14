import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3001/v1/users/';

export function getUserDetails() {
  return axios.get(API_URL + 'me', { headers: authHeader() });
}

export function updateUserDetails(data: any) {
  return axios.patch(API_URL + 'me', { headers: authHeader(), body: data });
}
