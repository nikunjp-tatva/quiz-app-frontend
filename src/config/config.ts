const baseUrl = 'http://localhost:3001/v1';

const authBaseUrl = baseUrl + '/auth';
const examBaseUrl = baseUrl + '/exams';
const questionBaseUrl = baseUrl + '/questions';
const technologyBaseUrl = baseUrl + '/technologies';
const userBaseUrl = baseUrl + '/users';

export const API_URL = {
  AUTH: {
    LOGIN: authBaseUrl + '/login',
    REGISTER: authBaseUrl + '/register',
  },
  EXAM: {
    RESULT: examBaseUrl + '/result',
    LIST: examBaseUrl + '/list',
    SUMMARY: examBaseUrl + '/summary',
    DETAILS: examBaseUrl + '/details',
  },
  QUESTION: {
    CREATE: questionBaseUrl,
    UPDATE: questionBaseUrl,
    GETS: questionBaseUrl,
    GET_BY_ID: questionBaseUrl,
  },
  TECHNOLOGY: {
    CREATE: technologyBaseUrl,
    UPDATE: technologyBaseUrl,
    GETS: technologyBaseUrl,
    GET_BY_ID: technologyBaseUrl,
    LIST: technologyBaseUrl + '/list',
    ACCESSED: technologyBaseUrl + '/accessed',
  },
  USER: {
    GET_DETAILS: userBaseUrl + '/me',
    UPDATE_DETAILS: userBaseUrl + '/me',
  },
};

export const PATH = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  TECHNOLOGIES: '/technologies',
  QUESTIONS: '/questions',
  DASHBOARD: '/dashboard',
  HOME: '/home',
  EXAMS: '/exams',
  EXAMS_TECHNOLOGY: '/exams/:technologyId',
  EXAM_RESULT: '/exam-result',
  UNAUTHORIZED: '/unauthorized',
  FORBIDDEN: '/forbidden',
};

export const COLOR = {
  BLUE: '#1976d2',
  BLACK: '#465167',
  ANSWERED: '#398B39',
  NOT_ANSWERED: '#DA7B03',
  CURRENT: '#0468BF',
  EXAM_BACKGROUND: '#E7E7E7',
  MARK_FOR_REVIEW: '#A40503',
  NOT_ATTEMPTED: '#F0F0F0',
};

export const alphabetOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
