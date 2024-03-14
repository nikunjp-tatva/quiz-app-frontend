import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3001/v1/exams/';

export function saveExamResult(data: any) {
  return axios.post(API_URL + 'result', { ...data }, { headers: authHeader() });
}

export function getSubmittedExamsOfUser() {
  return axios.get(API_URL + 'list', { headers: authHeader() });
}

export function getAllExamSummary() {
  return axios.get(API_URL + 'summary', { headers: authHeader() });
}

export function getExamResultDetails(technologyId: string) {
  return axios.get(`${API_URL}details/${technologyId}`, {
    headers: authHeader(),
  });
}
