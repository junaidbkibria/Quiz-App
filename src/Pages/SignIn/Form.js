import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './signin.css'
import AlertModal from '../../Components/Alert';
import { emailVerify } from '../../Utility/EmailVerify';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState("user");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();



    const login = () => {

        if (!name) {
            setOpen(true);
            setMessage("Name field cannot be empty");
        } else if (!email) {
            setOpen(true);
            setMessage("Email field cannot be empty");
        } else if (!emailVerify(email)) {
            setOpen(true);
            setMessage("Invalid Email");
        } else {
            let user = {
                name: name,
                email: email,
                type: type
            }
            if (!localStorage.getItem('User')) {
                let userArray = [user];
                localStorage.setItem('User', JSON.stringify(userArray));
                localStorage.setItem('currentUser', JSON.stringify(user));
                startTransition(() => {
                    if (type === 'admin') {
                        navigate('/add-question');
                    } else {
                        navigate('/answer');
                    }
                });
            } else {
                let userArray = JSON.parse(localStorage.getItem('User'));
                let userExists = false;
                userArray.forEach(item => {
                    if (item.email === email) {
                        userExists = true;
                        if (item.type !== type) {
                            setOpen(true);
                            setMessage(`This email is already registered with type: ${item.type}`);
                        } else {
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            startTransition(() => {
                                if (type === 'admin') {
                                    navigate('/add-question');
                                } else {
                                    navigate('/answer');
                                }
                            });
                        }
                    }
                });
                if (!userExists) {
                    userArray.push(user);
                    console.log(userArray)
                    localStorage.setItem('User', JSON.stringify(userArray));
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    startTransition(() => {
                        if (type === 'admin') {
                            navigate('/add-question');
                        } else {
                            navigate('/answer');
                        }
                    });
                }
            }
        }
    }



    return (
        <Box className="form">
            <Typography className="name">Name</Typography>
            <TextField
                variant='outlined'
                onChange={(e) => setName(e.target.value)}
                sx={{ input: { background: '#38304C', borderRadius: '10px', color: 'white', focus: { outline: 'none' } }, width: '100%', mb: '5px' }}
            />
            <Typography className="name">Email</Typography>
            <TextField
                variant='outlined'
                onChange={(e) => setEmail(e.target.value)}
                sx={{ input: { background: '#38304C', borderRadius: '10px', color: 'white' }, width: '100%', mb: '5px' }}
            />

            <Typography className="name">Login As</Typography>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <Box sx={{ display: 'flex' }}>
                        <FormControlLabel sx={{ ml: 0 }} labelPlacement="start" value="admin" control={<Radio sx={{ color: 'white' }} />} label="Admin" />
                        <FormControlLabel sx={{ ml: '10px', border: 'white' }} labelPlacement="start" value="user" control={<Radio sx={{ color: 'white' }} />} label="User" />
                    </Box>
                </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '10px' }}>
                <Button onClick={login} className='button'>Sign In</Button>
            </Box>
            <AlertModal
                open={open}
                setOpen={setOpen}
                message={message}
            />
        </Box>
    )
}

export default Form