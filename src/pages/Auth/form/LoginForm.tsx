import React, { useCallback } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';

import { FormInputText } from "../../../common/form-component/FormInputText";

interface IFormInput {
    email: string;
    password: string;
}

const defaultValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(4),
});

const useYupValidationResolver = (validationSchema: Yup.ObjectSchema<{ email: string; password: string; }, Yup.AnyObject, { email: undefined; password: undefined; }, "">) =>
    useCallback(
        async (data: any) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                })

                return {
                    values,
                    errors: {},
                }
            } catch (errors: any) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors: any, currentError: { path: any; type: any; message: any; }) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? "validation",
                                message: currentError.message,
                            },
                        }),
                        {}
                    ),
                }
            }
        },
        [validationSchema]
    )

const LoginForm = () => {
    const resolver = useYupValidationResolver(validationSchema)

    const { handleSubmit, reset, control, setValue, watch } = useForm<IFormInput>(
        {
            defaultValues,
            resolver,
        },
    );

    const onSubmit = (data: IFormInput) => console.log(data);

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
            </Stack>
            <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="small"
                fullWidth
            >
                Sign In
            </Button>
        </Box>
    );
};

export default LoginForm;
