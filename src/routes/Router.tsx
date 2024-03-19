import React, { lazy } from "react";

import { RoleBasedRoute } from "../components/RoleBasedRoute";
import roles from '../config/Roles';
import ExamBoard from "../pages/ExamBoard/ExamBoard";
import { PATH } from "../config/config";

/* ****Pages***** */
const Register = lazy(() => import("../pages/Auth/Register"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Sidebar = lazy(() => import("../common/layouts/sidebar/Sidebar"));
const Technology = lazy(() => import("../pages/Technology/Technology"));
const Question = lazy(() => import("../pages/Question/Question"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const StudentDashboard = lazy(() => import("../pages/StudentDashboard/StudentDashboard"));
const ExamList = lazy(() => import("../pages/Exam/ExamList"));
const ExamResult = lazy(() => import("../pages/ExamResult/ExamResult"));

const Router = [
    {
        path: "/auth",
        children: [
            { path: PATH.REGISTER, element: <Register /> },
            { path: PATH.LOGIN, element: <Login /> },
        ],
    },
    {
        path: "/",
        children: [
            { path: PATH.TECHNOLOGIES, element: <RoleBasedRoute roles={[roles.EXAMINER]} element={(<Sidebar><Technology /></Sidebar>)} /> },
            { path: PATH.QUESTIONS, element: <RoleBasedRoute roles={[roles.EXAMINER]} element={(<Sidebar><Question /></Sidebar>)} /> },
            { path: PATH.DASHBOARD, element: <RoleBasedRoute roles={[roles.EXAMINER]} element={(<Sidebar><Dashboard /></Sidebar>)} /> },
        ],
    },
    {
        path: "/",
        children: [
            { path: PATH.HOME, element: <RoleBasedRoute roles={[roles.STUDENT]} element={(<Sidebar><StudentDashboard /></Sidebar>)} /> },
            { path: PATH.EXAMS, element: <RoleBasedRoute roles={[roles.STUDENT]} element={(<Sidebar><ExamList /></Sidebar>)} /> },
            { path: PATH.EXAMS_TECHNOLOGY, element: <RoleBasedRoute roles={[roles.STUDENT]} element={(<Sidebar><ExamBoard /></Sidebar>)} /> },
            { path: PATH.EXAM_RESULT, element: <RoleBasedRoute roles={[roles.STUDENT]} element={(<Sidebar><ExamResult /></Sidebar>)} /> },
        ],
    },
];

export default Router;
