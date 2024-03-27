import React from "react";
import { Navigate } from "react-router-dom";

import { getUser } from "../services/auth.service";
import { PATH } from "../config/config";

interface RoleBasedRouteProps
    extends React.PropsWithChildren<{ roles: string[] }> {
    element: React.ReactElement;
}

export function RoleBasedRoute({
    roles,
    element,
}: Readonly<RoleBasedRouteProps>) {
    const userRole = getUser()?.role;

    if (!userRole) {
        return <Navigate to={PATH.LOGIN} />;
    }
    if (userRole && roles.includes(userRole)) {
        return element;
    }

    return <Navigate to={PATH.FORBIDDEN} />;
}
