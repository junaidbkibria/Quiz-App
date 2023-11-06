import { Box, Typography } from '@mui/material'
import React from 'react'
import './signin.css'
import Form from './Form'

const SignIn = () => {
    return (
        <Box className="loginBox">
            <Box className="container">
                <Typography sx={{ fontSize: '24px', mt: '40px' }}>Quiz App</Typography>
                <Typography sx={{ fontSize: '20px', margin: '15px 0' }}>Sign In</Typography>
                <Form/>
            </Box>
        </Box>
    )
}

export default SignIn