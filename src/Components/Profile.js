import React, { startTransition, useState } from 'react'
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { name, email, type } = JSON.parse(localStorage.getItem('currentUser'));
    const settings = [name?`${name} (${type})`:"", email];
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutFunction = () => {
        let user = {
            name: '',
            email: '',
            type: ''
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        startTransition(() => {
            navigate('/');
        });
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                    <AccountCircleIcon sx={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                <MenuItem onClick={logoutFunction}>
                    <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default Profile