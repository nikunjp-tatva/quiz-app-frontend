import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function BoxHeader({ title }: Readonly<{ title: string }>) {
    return (
        <Box
            height={40}
            sx={{ backgroundColor: "#DBDBDB", display: "flex" }}
            justifyContent="center"
            alignItems="center"
        >
            <Typography fontWeight={600} sx={{ fontSize: "1.1rem" }}>
                {title}
            </Typography>
        </Box>
    );
}
