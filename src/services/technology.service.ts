import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3001/v1/technologies/';

export function addTechnology(data: any) {
  return axios.post(API_URL, { headers: authHeader(), body: data });
}

export function getTechnologies(params: any) {
  return axios.get(API_URL, { headers: authHeader(), params });
}

export function getTechnologyById(technologyId: string) {
  return axios.get(API_URL + technologyId, { headers: authHeader() });
}

export function updateTechnologyById(technologyId: string, data: any) {
  return axios.patch(API_URL + technologyId, {
    headers: authHeader(),
    body: data,
  });
}
