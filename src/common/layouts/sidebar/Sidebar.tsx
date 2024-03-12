import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { sidebarItems } from './SidebarItems';
import Header from '../header/Header';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar({ children }: any) {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: "#1976d2",
                        color: "#fff"
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {sidebarItems.map((data) => {
                            const Icon = data.icon;
                            return (
                                <ListItem key={data.name} disablePadding to={data.href} component={ NavLink } sx={{ textDecoration: 'none', color: '#fff'}}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Icon style={{ color: "#fff" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={data.name} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, paddingTop: 10, paddingLeft: 1 }}>
                {children}
            </Box>
        </Box>
    );
}
