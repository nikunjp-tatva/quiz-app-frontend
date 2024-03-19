import axios from 'axios';
import authHeader from './authHeader';

import { API_URL } from '../config/config';

export function addQuestion(data: any) {
  return axios.post(
    API_URL.QUESTION.CREATE,
    { ...data },
    { headers: authHeader() }
  );
}

export function getQuestions() {
  return axios.get(API_URL.QUESTION.GETS, { headers: authHeader() });
}

export function getQuestionById(questionId: string) {
  return axios.get(API_URL.QUESTION.GET_BY_ID + questionId, {
    headers: authHeader(),
  });
}

export function updateQuestionById(questionId: string, data: any) {
  return axios.patch(
    API_URL.QUESTION.UPDATE + questionId,
    { ...data },
    { headers: authHeader() }
  );
}
