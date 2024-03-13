import React from 'react';
import { Info } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function InfoTextIcon({ headerName, titleText }: Readonly<{ headerName: string; titleText: string; }>) {
    return (
        <>
            {headerName}
            <Tooltip title={titleText}>
                <IconButton size="small">
                    <Info />
                </IconButton>
            </Tooltip>
        </>
    )
}
