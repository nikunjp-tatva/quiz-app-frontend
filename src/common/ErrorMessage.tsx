import React from "react";
import { Box, Typography } from "@mui/material";

export default function ErrorMessage({
    message,
    style,
}: Readonly<{ message: string; style?: object }>) {
    return (
        <Box component="section" sx={{ padding: "10px", ...style }}>
            <Typography
                fontWeight={600}
                variant="subtitle1"
                component="p"
                sx={{ flexGrow: 1, backgroundColor: "error.main" }}
                textAlign="center"
                color="#fff"
            >
                Error: {message}
            </Typography>
        </Box>
    );
}
