import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack, styled } from '@mui/material';
import Profile from './Profile';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
        minHeight: '70px',
    },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '98%',
}));

export default function Header({ open, handleDrawerOpen }: Readonly<{ open: boolean; handleDrawerOpen: any }>) {
    return (
        <AppBarStyled position="static" color="transparent" sx={{ backgroundColor: "#E0E0E0" }}>
            <ToolbarStyled>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Home
                </Typography>
                <Box flexGrow={1} />
                <Stack spacing={1} direction="row" alignItems="center">
                    <Profile />
                </Stack>

            </ToolbarStyled>
        </AppBarStyled>
    )

}
