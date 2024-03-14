import React from 'react';
import FormHelperText from '@mui/material/FormHelperText'

export default function HelperText({ isError, message, style }: Readonly<{ isError?: boolean; message?: string; style?: object }>) {
    return (
        <FormHelperText error={isError} sx={style}>{message}</FormHelperText>
    )
}
