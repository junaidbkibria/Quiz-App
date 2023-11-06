import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

export default function MyAnswers({ data, answerFunction, id }) {
    let obj = data.find((item)=> item.email === JSON.parse(localStorage.getItem('currentUser')).email);
    let reversed = obj?.answers?obj.answers.reverse():[];
    // console.log(obj);
    const editAnswer = (prev) =>{
        answerFunction(id,prev);
    }
    return (
        <div>
            <Accordion sx={{ mt: '10px', mr: '10px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>My Answers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {reversed.length>0 && reversed.map((i, idx) => (
                        <Box sx={{display: 'flex',justifyContent: 'space-between',}}>
                            <Typography key={idx}>{`${idx+1}: ${i}`}</Typography>
                            <EditIcon onClick={()=> editAnswer(i)} sx={{cursor: 'pointer'}}/>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
