import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../services/auth.service";
import roles from "../../config/Roles";
import { PATH } from "../../config/config";

export default function NotFound() {
    const history = useNavigate();
    const userRole = getUser()?.role;

    const handleButtonClick = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (userRole) {
            history(userRole === roles.EXAMINER ? PATH.DASHBOARD : PATH.HOME);
        } else {
            history(PATH.LOGIN);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Paper
                sx={{
                    border: "4px solid #5679ad",
                    borderRadius: 2,
                    boxShadow: "0px 0px 6px 1px #5679ad",
                    height: 300,
                    width: 500,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" textAlign="center" p={2}>
                    Error 404 - Page not found
                </Typography>
                <Typography variant="body1" textAlign="center" p={2}>
                    Sorry, the page you are looking for does not exist.
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                    <Button variant="contained" onClick={handleButtonClick}>
                        Go back to{" "}
                        {userRole
                            ? userRole === roles.EXAMINER
                                ? "Dashboard"
                                : "Home"
                            : "Login"}{" "}
                        Page
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
