import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useYupValidationResolver } from '../helpers/yupValidation.helper';
import { getUserDetails, updateUserDetails } from '../services/user.service';
import { FormInputText } from '../common/form-component/FormInputText';
import HelperText from '../common/HelperText';

interface ProfileModalProps {
    open: boolean;
    handleClose: () => void;
}

interface IProfileEditInput {
    name: string;
    password: string | null | undefined;
    email: string;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const profileEditValidationSchema: any = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
        .nullable()
        .transform((value) => (value === '' ? undefined : value))
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
        .notRequired(),
});


export default function ProfileModal({ open, handleClose }: Readonly<ProfileModalProps>) {

    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDefaultValueLoading, setIsDefaultValueLoading] = useState<boolean>(false);

    const resolver = useYupValidationResolver(profileEditValidationSchema)

    const { handleSubmit, control } = useForm<any>(
        {
            defaultValues: async () => {
                setIsDefaultValueLoading(true);
                const data = await getUserDetails();
                setIsDefaultValueLoading(false);
                return {
                    name: data.data.name ?? '',
                    email: data.data.email ?? '',
                    password: data.data.password ?? '',
                };
            },
            resolver,
        },
    );

    const onSubmit = async (data: IProfileEditInput) => {
        try {
            setError('');
            setIsLoading(true);
            await updateUserDetails(data);
            setIsLoading(false);
            handleClose();
        } catch (error: any) {
            setIsLoading(false);
            console.log({ error: error });
            if (error?.response?.status === 401) setError(error?.response?.data?.message);
            else setError(error?.response?.data?.message ?? "Something went wrong. Please try again later.");
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="profile-edit-modal"
            aria-describedby="modal-modal-description"
        >
            {isDefaultValueLoading ? (<Box><HelperText isError={false} message={'Fetching data...'} style={{ ...style, 'fontSize': '2rem', textAlign: 'center' }} /></Box>) : (
                <Box sx={style}>
                    <Typography variant='h5' textAlign="center"> Edit User</Typography>
                    <Stack mb={3}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="name"
                            mb="5px"
                            sx={{
                                '&::after': {
                                    content: "' *'",
                                    color: 'red',
                                },
                            }}
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
                            sx={{
                                '&::after': {
                                    content: "' *'",
                                    color: 'red',
                                },
                            }}
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

                    {error && <HelperText isError={true} message={error} style={{ 'fontSize': '1rem' }} />}<br />

                    <Button
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                        size="small"
                        fullWidth
                        disabled={isLoading}
                    >
                        Update details
                    </Button>
                </Box>
            )}

        </Modal>
    )
}
