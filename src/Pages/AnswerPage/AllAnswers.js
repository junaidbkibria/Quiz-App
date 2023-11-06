import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AllAnswers({ data }) {

    return (
        <div>
            <Accordion sx={{ mt: '10px', mr: '10px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>User Answers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {data.length>0 && data.map(i => (
                        (i.answers.length > 0?<Typography key={i.email}>{`${i.name.toUpperCase()} : ${i.answers[i.answers.length -1]}`}</Typography>:"")
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
