import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import LoginIcon from '@mui/icons-material/Login';
import ListItemIcon from "@mui/material/ListItemIcon";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (true) {
        return (<div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ManageAccountsIcon width={20} />
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LogoutIcon width={20} />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText></MenuItem>
            </Menu>
        </div >)
    }

    return (<Button variant="contained" endIcon={<LoginIcon />}>
        Login
    </Button>)
}

export default Profile;