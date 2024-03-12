import {
  Home,
  People,
  QuestionAnswer,
  RateReview,
  Settings,
} from '@mui/icons-material';

export const sidebarItems = [
  {
    name: 'Home',
    icon: Home,
    href: '/',
  },
  {
    name: 'Users',
    icon: People,
    href: '/users',
  },
  {
    name: 'Technologies',
    icon: RateReview,
    href: '/technologies',
  },
  {
    name: 'Questions',
    icon: QuestionAnswer,
    href: '/questions',
  },
  {
    name: 'Global Settings',
    icon: Settings,
    href: '/settings',
  },
];
