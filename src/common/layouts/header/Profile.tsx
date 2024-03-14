import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle"
import IconButton from "@mui/material/IconButton/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { removeUserSession } from "../../../services/auth.service";

const Profile = () => {
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        removeUserSession();
        history('/auth/login');
    }

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
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon width={20} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText></MenuItem>
        </Menu>
    </div >)

}

export default Profile;