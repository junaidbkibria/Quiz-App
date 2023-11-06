import React, { useEffect, useState } from 'react'
import AlertModal from '../../Components/Alert'
import { Box, Typography } from '@mui/material'

const AnswerForm = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect((() => {
        setMessage("")
    }),[])
    return (
        <Box sx={{ width: '90%', margin: '0 auto' }}>
            <Box sx={{ m: '20px 0' }}>
                <Typography>Answer (Add | Edit)</Typography>
            </Box>
            <AlertModal
                open={open}
                setOpen={setOpen}
                message={message}
            />
        </Box>
    )
}

export default AnswerForm