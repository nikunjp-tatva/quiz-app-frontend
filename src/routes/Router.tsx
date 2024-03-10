import React, { lazy } from "react";

/* ****Pages***** */
const Register = lazy(() => import("../pages/Auth/Register"));
const Login = lazy(() => import("../pages/Auth/Login"));

const Router = [
  {
    path: "/auth",
    children: [
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
    ],
  },
];

export default Router;
