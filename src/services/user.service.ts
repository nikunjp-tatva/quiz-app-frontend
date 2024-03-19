import axios from 'axios';
import authHeader from './authHeader';

import { API_URL } from '../config/config';

export function getUserDetails() {
  return axios.get(API_URL.USER.GET_DETAILS, { headers: authHeader() });
}

export function updateUserDetails(data: any) {
  return axios.patch(
    API_URL.USER.UPDATE_DETAILS,
    { ...data },
    { headers: authHeader() }
  );
}
