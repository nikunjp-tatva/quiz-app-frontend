import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';

type CustomTextFieldProps = TextFieldProps & {
    id: string;
    variant: string;
    fullWidth: true;
}

const CustomTextField = styled((props) => <TextField {...props} />)<CustomTextFieldProps>(
    ({ theme }) => ({
        '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
            color: theme.palette.text.secondary,
            opacity: '0.8',
        },
        '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
            color: theme.palette.text.secondary,
            opacity: '1',
        },
        '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[200],
        },
    })
);

export default CustomTextField;
