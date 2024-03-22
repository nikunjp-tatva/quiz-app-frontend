import React from 'react';
import { Navigate } from 'react-router-dom';

import { getUser } from '../../services/auth.service';
import { PATH } from '../../config/config';
import roles from '../../config/Roles';

export default function Index() {
    const userRole = getUser()?.role;

    if (userRole === roles.EXAMINER) {
        return <Navigate to={PATH.DASHBOARD} />
    }

    return <Navigate to={PATH.HOME} />
}
