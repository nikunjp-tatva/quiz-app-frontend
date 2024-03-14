import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3001/v1/questions/';

export function addQuestion(data: any) {
  return axios.post(API_URL, { ...data }, { headers: authHeader() });
}

export function getQuestions() {
  return axios.get(API_URL, { headers: authHeader() });
}

export function getQuestionById(questionId: string) {
  return axios.get(API_URL + questionId, { headers: authHeader() });
}

export function updateQuestionById(questionId: string, data: any) {
  return axios.patch(
    API_URL + questionId,
    { ...data },
    { headers: authHeader() }
  );
}
