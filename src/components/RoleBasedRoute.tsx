import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../services/auth.service';

interface RoleBasedRouteProps extends React.PropsWithChildren<{ roles: string[]; }> {
    element: React.ReactElement;
}

export function RoleBasedRoute({ roles, element }: Readonly<RoleBasedRouteProps>) {
    const userRole = getUser()?.role;

    if (!userRole) {
        return <Navigate to="/auth/login" />;
    }
    if (userRole && roles.includes(userRole)) {
        return element;
    }

    return <Navigate to="/unauthorized" />;
}