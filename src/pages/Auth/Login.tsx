import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";

import PageContainer from "../../common/container/PageContainer";
import LoginForm from "./form/LoginForm";
import { COLOR, PATH } from "../../config/config";
import { getToken } from "../../services/auth.service";

const Login = () => {
    const userToken = getToken();

    if (userToken) {
        return <Navigate to={PATH.INDEX} />;
    }

    return (
        <PageContainer title="Login" description="this is Login page">
            <Box
                sx={{
                    position: "relative",
                    "&:before": {
                        content: '""',
                        backgroundColor: COLOR.BLACK,
                        backgroundSize: "400% 400%",
                        animation: "gradient 15s ease infinite",
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                    },
                }}
            >
                <Grid
                    container
                    spacing={0}
                    justifyContent="center"
                    sx={{ height: "100vh" }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={4}
                        xl={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card
                            elevation={9}
                            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
                        >
                            <Typography
                                fontWeight="400"
                                variant="h4"
                                textAlign="center"
                                mb={1}
                            >
                                Login
                            </Typography>
                            <LoginForm />
                            <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                                <Typography color="textSecondary" variant="h6" fontWeight="500">
                                    New to App?
                                </Typography>
                                <Typography
                                    component={Link}
                                    to="/auth/register"
                                    fontWeight="500"
                                    sx={{
                                        textDecoration: "none",
                                        color: "primary.main",
                                    }}
                                >
                                    Create an account
                                </Typography>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Login;
