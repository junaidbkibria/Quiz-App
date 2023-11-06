/* eslint-disable no-undef */
import { Box } from '@mui/material'
import React from 'react'
import './addQuestion.css'
import NavBar from '../../Components/NavBar'
import QuestionForm from './QuestionForm'

const AddQuestion = () => {
    const type = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')).type: null;

    return (
        <Box className="outerBox">
            <NavBar />
            {type === 'admin' ?
                <Box className="container">
                    <QuestionForm/>
                </Box> : <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
                    <h2>Not Authorized</h2>
                </Box>
            }
        </Box>
    )
}

export default AddQuestion