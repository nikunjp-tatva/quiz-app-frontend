import axios from 'axios';
import authHeader from './authHeader';

import { API_URL } from '../config/config';

export function saveExamResult(data: any) {
  return axios.post(
    API_URL.EXAM.RESULT,
    { ...data },
    { headers: authHeader() }
  );
}

export function getSubmittedExamsOfUser() {
  return axios.get(API_URL.EXAM.LIST, { headers: authHeader() });
}

export function getAllExamSummary() {
  return axios.get(API_URL.EXAM.SUMMARY, { headers: authHeader() });
}

export function getExamDetails(technologyId: string) {
  return axios.get(API_URL.EXAM.DETAILS + `/${technologyId}`, {
    headers: authHeader(),
  });
}
