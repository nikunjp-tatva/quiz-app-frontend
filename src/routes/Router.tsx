import React, { lazy } from "react";
import { RoleBasedRoute } from "../components/RoleBasedRoute";
import roles from '../config/Roles';

/* ****Pages***** */
const Register = lazy(() => import("../pages/Auth/Register"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Sidebar = lazy(() => import("../common/layouts/sidebar/Sidebar"));
const Technology = lazy(() => import("../pages/Technology/Technology"));
const Question = lazy(() => import("../pages/Question/Question"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const StudentDashboard = lazy(() => import("../pages/StudentDashboard/StudentDashboard"));
const ExamBoard = lazy(() => import("../pages/ExamBoard/ExamBoard"));

const Router = [
    {
        path: "/auth",
        children: [
            { path: "/auth/register", element: <Register /> },
            { path: "/auth/login", element: <Login /> },
        ],
    },
    {
        path: "/",
        children: [
            { path: "/technologies", element: <RoleBasedRoute roles={[roles.EXAMINER]} element={(<Sidebar><Technology /></Sidebar>)} /> },
            { path: "/questions", element: <RoleBasedRoute roles={[roles.EXAMINER]} element={(<Sidebar><Question /></Sidebar>)} /> },
            { path: "/dashboard", element: <RoleBasedRoute roles={[roles.EXAMINER]} element={(<Sidebar><Dashboard /></Sidebar>)} /> },
        ],
    },
    {
        path: "/",
        children: [
            { path: "/home", element: <RoleBasedRoute roles={[roles.STUDENT]} element={(<Sidebar><StudentDashboard /></Sidebar>)} /> },
            { path: "/exams", element: <RoleBasedRoute roles={[roles.STUDENT]} element={(<Sidebar><ExamBoard /></Sidebar>)} /> },
        ],
    },
];

export default Router;
