import React, { useEffect, useState } from 'react'
import AlertModal from '../../Components/Alert'
import { Box, Button, TextField, Typography } from '@mui/material'
import AllAnswers from './AllAnswers';
import Success from '../../Components/Success';
import MyAnswers from './MyAnswers';

const AnswerForm = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [openS, setOpenS] = useState(false);
    const [messageS, setMessageS] = useState("");
    const [answers, setAnswers] = useState([]);
    const [valueInput, setValueInput] = useState("");
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : []);

    const answerFunction = (id, value) => {
        let tempArr = [...answers];
        if (tempArr.length === 0 || !answerExists(id)) {
            tempArr.push({ id: id, value: value });
            setAnswers(tempArr);
        } else {
            tempArr.every((item) => {
                if (item.id === id) {
                    item.value = value;
                    return false
                }
                return true;
            })
            setAnswers(tempArr);
        }
    }

    const submitAnswer = (id) => {
        console.log(id);
        if (!getValue(id)) {
            setOpen(true);
            setMessage("Answer field is empty");
        } else {
            setValueInput(getValue(id));
            let currentData = data;
            currentData.every((item) => {
                if (item.id === id) {
                    let currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;
                    //checking if this user attempted any answers before
                    // console.log(item.a, 'item.a')
                    const doUserHaveAnswer = item.a.find((x) => x.email === currentUserEmail);
                    if (!doUserHaveAnswer) {
                        let obj = {
                            name: JSON.parse(localStorage.getItem('currentUser')).name,
                            email: JSON.parse(localStorage.getItem('currentUser')).email,
                            answers: [getValue(id)]
                        }
                        item.a.push(obj);
                    } else {
                        doUserHaveAnswer.answers.push(getValue(id));
                        // item.a.push(doUserHaveAnswer);
                    }
                    // setData(currentData);
                    // localStorage.setItem('data', JSON.stringify(currentData));
                    return false;
                }
                return true;
            })
            localStorage.setItem('data', JSON.stringify(currentData));
            setData(currentData);
            console.log(currentData);
            setOpenS(true);
            setMessageS("Submitted");
        }
    }

    const answerExists = (id) => {
        const answer = answers.find((item) => item.id === id);
        return answer ? true : false;
    }

    const getValue = (id) => {
        const answer = answers.find((item) => item.id === id);
        return answer ? answer.value : '';
    }

    useEffect((() => {
        setMessage("")
    }), [])

    useEffect((() => {
        console.log('triggered')
    }), [valueInput]);

    return (
        <Box sx={{ width: '90%', margin: '0 auto' }}>
            <Box sx={{ m: '20px 0' }}>
                <Typography>Answer (Add | Edit)</Typography>
                {data.length > 0 && data.map((item) => (
                    <Box key={item.id} className="qnaBox">
                        <Typography sx={{ mb: '5px' }}>{item.q}</Typography>
                        {JSON.parse(localStorage.getItem('currentUser')).type === 'user' && <Box sx={{ display: 'flex', justifyContent: 'space-betwen', alignItems: 'center', width: '100%' }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Answer"
                                multiline
                                maxRows={4}
                                value={getValue(item.id)}
                                onChange={(e) => answerFunction(item.id, e.target.value)}
                                sx={{ width: '85%', background: "#fff", borderRadius: '5px' }}
                            />
                            <Button sx={{ mx: '10px' }} variant='contained' onClick={() => submitAnswer(item.id)}>Submit</Button>
                        </Box>}
                        {JSON.parse(localStorage.getItem('currentUser')).type === 'admin' && <AllAnswers data={item.a} />}
                        {JSON.parse(localStorage.getItem('currentUser')).type === 'user' && <MyAnswers data={item.a} answerFunction={answerFunction} id ={item.id}/>}
                    </Box>
                ))}
            </Box>
            <AlertModal
                open={open}
                setOpen={setOpen}
                message={message}
            />
            <Success
                open={openS}
                setOpen={setOpenS}
                message={messageS}
            />
        </Box>
    )
}

export default AnswerForm