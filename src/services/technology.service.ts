import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3001/v1/technologies/';

export function addTechnology(data: any) {
  return axios.post(
    API_URL,
    {
      name: data.name,
      description: data.description || undefined,
      noOfQuestion: data.noOfQuestion,
      duration: data.duration,
      cutOff: data.cutOff,
    },
    { headers: authHeader() }
  );
}

export function getTechnologies() {
  return axios.get(API_URL, { headers: authHeader() });
}

export function getTechnologyById(technologyId: string) {
  return axios.get(API_URL + technologyId, { headers: authHeader() });
}

export function updateTechnologyById(technologyId: string, data: any) {
  return axios.patch(
    API_URL + technologyId,
    {
      name: data.name,
      description: data.description || undefined,
      noOfQuestion: data.noOfQuestion,
      duration: data.duration,
      cutOff: data.cutOff,
    },
    { headers: authHeader() }
  );
}

export function getTechnologiesList() {
  return axios.get(API_URL + 'list');
}

export function getUserTechnologies() {
  return axios.get(API_URL + 'accessed', { headers: authHeader() });
}
