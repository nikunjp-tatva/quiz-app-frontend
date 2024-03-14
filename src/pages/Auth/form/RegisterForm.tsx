import React, { useCallback } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';

import { FormInputText } from "../../../common/form-component/FormInputText";
import { FormInputRadio } from "../../../common/form-component/FormInputRadio";
import { FormInputDropdown } from "../../../common/form-component/FormInputDropdown";
import HelperText from "../../../common/HelperText";

interface IFormInput {
    name: string;
    email: string;
    password: string;
    role: string;
    selectedTechnology: string[];
}

const defaultValues = {
    name: "",
    email: "",
    password: "",
    role: "user",
    selectedTechnology: [],
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    role: Yup.string().oneOf(['user', 'admin'], 'You must select a role').required('Role is required'),

    selectedTechnology: Yup.array()
        .when('role', ([role], schema) => {
            if (role === 'user') {
                return schema.of(Yup.string()).min(1, 'One technology is required');
            }
            return schema.notRequired();
        }
        ),
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
const RegisterForm = () => {
    const resolver = useYupValidationResolver(validationSchema)

    const { handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm<IFormInput>(
        {
            defaultValues,
            resolver
        },
    );

    const role = watch("role");
    const onSubmit = (data: IFormInput) => console.log(data);

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

                {role === "user" && (
                    <>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="selectedTechnology"
                            mb="5px"
                            mt="25px"
                        >
                            Technologies
                        </Typography>
                        <FormInputDropdown name="selectedTechnology" control={control} />
                        {errors.selectedTechnology && <HelperText isError={true} message={errors.selectedTechnology.message} />}
                    </>
                )}
            </Stack>
            <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="small"
                fullWidth
                sx={{ marginBottom: '5px' }}
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
