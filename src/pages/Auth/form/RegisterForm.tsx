import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { FormInputText } from "../../../common/form-component/FormInputText";
import { FormInputRadio } from "../../../common/form-component/FormInputRadio";
import HelperText from "../../../common/HelperText";
import { registerValidationSchema } from "../validationSchema/registerSchema";
import { useYupValidationResolver } from "../../../helpers/yupValidation.helper";
import { register, setUserSession } from "../../../services/auth.service";
import TechnologyList from "../component/TechnologyList";
import roles from "../../../config/Roles";

interface IRegisterFormInput {
    name: string;
    email: string;
    password: string;
    role: string;
    technologies: string[];
}

const defaultValues = {
    name: "",
    email: "",
    password: "",
    role: "user",
    technologies: [],
};

const RegisterForm = () => {
    const history = useNavigate();

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const resolver = useYupValidationResolver(registerValidationSchema)

    const { handleSubmit, reset, control, watch, formState: { errors } } = useForm<IRegisterFormInput>(
        {
            defaultValues,
            resolver
        },
    );

    const role = watch("role");

    const onSubmit = async (data: IRegisterFormInput) => {
        try {
            setError('');
            setLoading(true);
            const userDetails = await register(data);

            setLoading(false);
            setUserSession(userDetails.accessToken, userDetails.user);

            const userRole = userDetails?.user?.role;

            history(userRole === roles.EXAMINER ? '/dashboard' : '/home');
        } catch (error: any) {
            setLoading(false);
            console.log({ error: error });
            if (error?.response?.status === 400) setError(error?.response?.data?.message);
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
                    htmlFor="name"
                    mb="5px"
                >
                    Name
                </Typography>
                <FormInputText name="name" control={control} type="text" />

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
                <FormInputText name="email" control={control} type="email" />

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
                <FormInputText name="password" control={control} type="password" />

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="role"
                    mb="5px"
                    mt="25px"
                >
                    Role
                </Typography>
                <FormInputRadio name="role" control={control} />

                {role === "user" && <TechnologyList control={control} errors={errors} />}
            </Stack>

            {error && <HelperText isError={true} message={error} style={{ 'fontSize': '1rem' }} />}<br />

            <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="small"
                fullWidth
                sx={{ marginBottom: '5px' }}
                disabled={loading}
            >
                Sign Up
            </Button>
            <Button onClick={() => reset()} variant="outlined" size="small" fullWidth sx={{ marginTop: '5px' }}>
                Reset
            </Button>
        </Box>
    );
};

export default RegisterForm;
