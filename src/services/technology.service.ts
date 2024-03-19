import axios from 'axios';
import authHeader from './authHeader';

import { API_URL } from '../config/config';

export function addTechnology(data: any) {
  return axios.post(
    API_URL.TECHNOLOGY.CREATE,
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
  return axios.get(API_URL.TECHNOLOGY.GETS, { headers: authHeader() });
}

export function getTechnologyById(technologyId: string) {
  return axios.get(API_URL.TECHNOLOGY.GET_BY_ID + technologyId, {
    headers: authHeader(),
  });
}

export function updateTechnologyById(technologyId: string, data: any) {
  return axios.patch(
    API_URL.TECHNOLOGY.UPDATE + technologyId,
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
  return axios.get(API_URL.TECHNOLOGY.LIST);
}

export function getUserTechnologies() {
  return axios.get(API_URL.TECHNOLOGY.ACCESSED, { headers: authHeader() });
}
