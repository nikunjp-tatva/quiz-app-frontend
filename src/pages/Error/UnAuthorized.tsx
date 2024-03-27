import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function UnAuthorized() {
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
                    height: 200,
                    width: 500,
                }}
            >
                <Typography variant="h4" textAlign="center" p={2}>
                    Error 401 - Unauthorized
                </Typography>
                <Typography variant="body1" textAlign="center" p={2}>
                    Sorry, you are not authorized to access page
                </Typography>
                <Typography variant="body1" textAlign="center" p={1}>
                    Return <Link href="/auth/login">Login Page</Link>
                </Typography>
            </Paper>
        </Box>
    );
}
