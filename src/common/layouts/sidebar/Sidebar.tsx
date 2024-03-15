import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';

import Header from '../header/Header';
import SidebarItems from './SidebarItems';

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
                        <SidebarItems/>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, paddingTop: 10, paddingLeft: 1 }}>
                {children}
            </Box>
        </Box>
    );
}
