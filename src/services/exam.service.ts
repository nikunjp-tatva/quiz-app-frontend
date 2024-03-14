import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3001/v1/exams/';

export function saveExamResult(data: any) {
  return axios.post(API_URL + 'result', { headers: authHeader(), body: data });
}

export function getSubmittedExamsOfUser(params: any) {
  return axios.get(API_URL + 'list', { headers: authHeader(), params });
}

export function getAllExamSummary(params: any) {
  return axios.get(API_URL + 'summary', { headers: authHeader(), params });
}

export function getExamResultDetails(technologyId: string) {
  return axios.get(`${API_URL}details/${technologyId}`, {
    headers: authHeader(),
  });
}
