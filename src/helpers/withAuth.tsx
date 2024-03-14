import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkToken } from '../services/user.service';

const withAuth = (ProtectComponent: any) => {
    return (props: any) => {
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();

        useEffect(() => {
            checkToken()
                .then(res => {
                    if (res.status === 200) {
                        setLoading(false);
                    }
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                    navigate("/auth/login");
                });
        }, [navigate]);

        if (loading) {
            return null;
        }
        return <ProtectComponent {...props} />;
    };
};

export default withAuth;