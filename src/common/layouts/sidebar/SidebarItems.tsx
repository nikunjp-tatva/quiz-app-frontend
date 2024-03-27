import React, { useState, useEffect } from "react";
import { Home, QuestionAnswer, Quiz, RateReview } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import { NavLink, useLocation } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import roles from "../../../config/Roles";
import { getUser } from "../../../services/auth.service";

export default function SidebarItems() {
    const [userRole, setUserRole] = useState(getUser()?.role);

    const location = useLocation();

    useEffect(() => {
        const handleStorageChange = () => {
            const newUserRole = getUser()?.role;
            if (newUserRole !== userRole) {
                setUserRole(newUserRole);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [userRole]);

    const adminSidebarItems = [
        { name: "Home", icon: Home, href: "/dashboard" },
        { name: "Technologies", icon: RateReview, href: "/technologies" },
        { name: "Questions", icon: QuestionAnswer, href: "/questions" },
    ];

    const userSidebarItems = [
        { name: "Home", icon: Home, href: "/home" },
        { name: "Exams", icon: Quiz, href: "/exams" },
    ];

    const sidebarItems =
        userRole === roles.EXAMINER ? adminSidebarItems : userSidebarItems;

    return (
        <>
            {sidebarItems.map((data) => {
                const Icon = data.icon;
                return (
                    <ListItem
                        key={data.name}
                        disablePadding
                        to={data.href}
                        component={NavLink}
                        sx={{
                            textDecoration: "none",
                            color: "#fff",
                            ...(location.pathname === data.href && {
                                backgroundColor: "#0c5297",
                                color: "#FFF",
                                stroke: "#FFF",
                            }),
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon style={{ color: "#fff" }} />
                            </ListItemIcon>
                            <ListItemText primary={data.name} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </>
    );
}
