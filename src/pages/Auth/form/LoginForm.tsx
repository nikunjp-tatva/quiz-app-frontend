import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FormInputText } from "../../../common/form-component/FormInputText";
import { useYupValidationResolver } from "../../../helpers/yupValidation.helper";
import { loginValidationSchema } from "../validationSchema/loginSchema";
import { login, setUserSession } from "../../../services/auth.service";
import HelperText from "../../../common/HelperText";
import roles from "../../../config/Roles";

interface ILoginFormInput {
    email: string;
    password: string;
}

const defaultValues = {
    email: "",
    password: "",
};

const LoginForm = () => {
    const history = useNavigate();

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const resolver = useYupValidationResolver(loginValidationSchema)

    const { handleSubmit, control } = useForm<ILoginFormInput>(
        {
            defaultValues,
            resolver,
        },
    );

    const onSubmit = async (data: ILoginFormInput) => {
        try {
            setError('');
            setLoading(true);
            const userDetails = await login(data.email, data.password);
            setLoading(false);

            setUserSession(userDetails.accessToken, userDetails.user);

            const userRole = userDetails?.user?.role;

            history(userRole === roles.EXAMINER ? '/dashboard' : '/home');
        } catch (error: any) {
            setLoading(false);
            console.log({ error: error });
            if (error?.response?.status === 401) setError(error?.response?.data?.message);
            else setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <Box>
            <Stack mb={3}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    mt="25px"
                >
                    Email Address
                </Typography>
                <FormInputText name="email" control={control} type="email" clearError={() => setError('')} />

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="password"
                    mb="5px"
                    mt="25px"
                >
                    Password
                </Typography>
                <FormInputText name="password" control={control} type="password" clearError={() => setError('')} />
            </Stack>

            {error && <HelperText isError={true} message={error} style={{ 'fontSize': '1rem' }} />}<br />

            <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="small"
                fullWidth
                disabled={loading}
            >
                Sign In
            </Button>
        </Box>
    );
};

export default LoginForm;
