/* eslint-disable no-undef */
import { Box } from '@mui/material'
import React from 'react'
import './answerPage.css'
import NavBar from '../../Components/NavBar'
import AnswerForm from './AnswerForm'

const AnswerPage = () => {
    const type = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).type : null;
    console.log(type,'tyyype');
    return (
        <Box className="outerBox">
            <NavBar />
            {(type !== 'admin' || type !== 'user') ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <h2>Not Authorized</h2>
            </Box> : <Box>
                <AnswerForm />
            </Box>}
        </Box>
    )
}

export default AnswerPage