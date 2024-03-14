import React, { lazy } from "react";

/* ****Pages***** */
const Register = lazy(() => import("../pages/Auth/Register"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Sidebar = lazy(() => import("../common/layouts/sidebar/Sidebar"));
const Technology = lazy(() => import("../pages/Technology/Technology"));
const Question = lazy(() => import("../pages/Question/Question"));

const Router = [
    {
        path: "/auth",
        children: [
            { path: "/auth/register", element: <Register /> },
            { path: "/auth/login", element: <Login /> },
            { path: "/auth/sidebar", element: <Sidebar /> },
        ],
    },
    {
        path: "/",
        children: [
            { path: "/technologies", element: (<Sidebar><Technology /></Sidebar>) },
            { path: "/questions", element: (<Sidebar><Question /></Sidebar>) },
            { path: "/dashboard", element: (<Sidebar />) },
        ],
    },
];

export default Router;
