import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, styled } from "@mui/material";

import Profile from "./Profile";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    border: "1px solid #00000021",
}));

export default function Header() {
    return (
        <AppBarStyled
            position="fixed"
            color="transparent"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "#495159",
                color: "#fff",
            }}
        >
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    QUIZ APP
                </Typography>
                <Stack spacing={1} direction="row" alignItems="center">
                    <Profile />
                </Stack>
            </Toolbar>
        </AppBarStyled>
    );
}
