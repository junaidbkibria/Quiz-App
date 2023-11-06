import React, { useState } from 'react'
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import CloseIcon from '@mui/icons-material/Close';
import './addQuestion.css';
import AlertModal from '../../Components/Alert';
import { v4 as uuidv4 } from 'uuid';

const QuestionForm = () => {
    const [newQ, setNewQ] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : []);
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState("");
    const [updatedQ, setUpdatedQ] = useState("");



    const createQuestion = () => {
        if (!newQ) {
            setOpen(true);
            setMessage("Question field is empty");
        } else {
            let obj = {
                id: uuidv4(),
                q: newQ,
                a: []
            }
            if (localStorage.getItem("data")) {
                let dataArr = JSON.parse(localStorage.getItem("data"));
                setQuestion(dataArr, obj);
            } else {
                let dataArr = [];
                setQuestion(dataArr, obj);
            }
        }
    }

    const setQuestion = (dataArr, obj) => {
        dataArr.push(obj);
        setData(dataArr);
        localStorage.setItem("data", JSON.stringify(dataArr));
        setNewQ("");
    }

    const editQuestion = (id,q) => {
        setId(id);
        setUpdatedQ(q)
        setEditMode(true)
    }

    const updateQuestion = (id) => {
        if (!updatedQ) {
            setOpen(true);
            setMessage("Update Question field is empty");
        } else {
            let dataBeforeUpdate = data;
            dataBeforeUpdate.every(item => {
                if (item.id === id) {
                    item.q = updatedQ;
                    setData(dataBeforeUpdate);
                    localStorage.setItem("data", JSON.stringify(dataBeforeUpdate));
                    setEditMode(false);
                    return false;
                }
                return true;
            })
        }
    }

    const deleteQuestion = (id) => {
        let dataBeforeUpdate = data;
        let newData = dataBeforeUpdate.filter(item => item.id !== id);
        setData(newData);
        localStorage.setItem("data", JSON.stringify(newData));
    }

    return (
        <Box sx={{ width: '90%', margin: '0 auto' }}>
            <Box sx={{ m: '20px 0' }}>
                <Typography>Question (Add | Edit | Delete)</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    label="New Question"
                    multiline
                    maxRows={4}
                    value={newQ}
                    onChange={(e) => setNewQ(e.target.value)}
                    sx={{ width: '100%', background: "#fff", borderRadius: '5px', mt: '20px' }}
                />
                <Button sx={{ mt: '5px' }} variant='contained' onClick={createQuestion}>Add</Button>
                <Box sx={{ mt: '15px' }}>
                    <Typography>All Questions</Typography>
                    {data.length > 0 && data.map((item => (
                        <Box key={item.id} className="singleQuestion">
                            {(item.id!== id || !editMode) && <><Typography>{item.q}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', minWidth: '70px' }}>
                                    <Tooltip title="edit">
                                        <EditIcon onClick={() => editQuestion(item.id,item.q)} sx={{ cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title="delete">
                                        <DeleteIcon onClick={() => deleteQuestion(id)} sx={{ cursor: 'pointer' }} />
                                    </Tooltip>
                                </Box>
                            </>}
                            {item.id === id && editMode && <>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Update"
                                    multiline
                                    maxRows={4}
                                    value={updatedQ}
                                    onChange={(e) => setUpdatedQ(e.target.value)}
                                    sx={{ width: '80%', background: "#fff", borderRadius: '5px', m: '5px' }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', minWidth: '70px' }}>
                                    <Tooltip title="update">
                                        <BuildIcon onClick={() => updateQuestion(item.id)} sx={{ cursor: 'pointer' }} />
                                    </Tooltip>
                                    <Tooltip title="cancel">
                                        <CloseIcon onClick={() => setEditMode(false)} sx={{ cursor: 'pointer' }} />
                                    </Tooltip>
                                </Box>
                            </>}
                        </Box>
                    )))}
                </Box>
            </Box>
            <AlertModal
                open={open}
                setOpen={setOpen}
                message={message}
            />
        </Box>
    )
}

export default QuestionForm