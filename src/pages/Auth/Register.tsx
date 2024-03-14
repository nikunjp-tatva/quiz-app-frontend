import React from "react";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import PageContainer from "../../common/container/PageContainer";
import RegisterForm from "./form/RegisterForm";

const Register = () => (
  <PageContainer title="Register" description="this is Register page">
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          backgroundColor: "#465167",
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
            <Typography fontWeight="400" variant="h4" textAlign="center" mb={1}>
              Register
            </Typography>
            <RegisterForm />
            <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
              <Typography color="textSecondary" variant="h6" fontWeight="400">
                Already have an Account?
              </Typography>
              <Typography
                component={Link}
                to="/auth/login"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                }}
              >
                Sign In
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Register;
