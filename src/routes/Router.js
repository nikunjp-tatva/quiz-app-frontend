import React, { lazy } from 'react';

/* ****Pages***** */
const Register = lazy(() => import('../pages/Auth/Register'));

const Router = [
  {
    path: '/auth',
    children: [{ path: '/auth/register', element: <Register /> }],
  },
];

export default Router;
