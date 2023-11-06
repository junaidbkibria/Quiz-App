/* eslint-disable no-undef */
import { Box } from '@mui/material'
import React from 'react'
import './answerPage.css'
import NavBar from '../../Components/NavBar'
import AnswerForm from './AnswerForm'

const AnswerPage = () => {
    return (
        <Box className="outerBox">
            <NavBar />
            <Box className="container">
                <AnswerForm/>
            </Box>
        </Box>
    )
}

export default AnswerPage