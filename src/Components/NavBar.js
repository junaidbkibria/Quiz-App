import React, { startTransition } from 'react'
import { Box, Typography } from '@mui/material'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const type = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')).type: null;
    const navigate = useNavigate();
    return (
        <Box sx={{ width: '100%', background: '#201A30' }}>
            <Box sx={{ width: '90%', margin: '0 auto', p: '10px 0', textAlign: 'start', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 900 }}>QuizApp</Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '33%'}}>
                    {type === 'admin' && <Typography onClick={()=> startTransition(()=>navigate('/add-question'))} sx={{ fontSize: '14px', fontWeight: 300, color: '#0DF5E3', cursor: 'pointer' }}>Question</Typography>}
                    <Typography onClick={()=> startTransition(()=>navigate('/answer'))} sx={{ fontSize: '14px', fontWeight: 300, color: '#0DF5E3', cursor: 'pointer' }}>Answer</Typography>
                </Box>
                <Profile/>
            </Box>
        </Box>
    )
}

export default NavBar