import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CommentCard from '../Components/CommentCard';


import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AdminMenu from './AdminMenu';
import FormUpdateComment from '../Form/FormUpdateComment';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AlertComment from '../AlertOnay/AlertComment';

export default function AdminComments() {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [comments, setComments] = useState([]);
    useEffect(() => {
        axios
            .get('/comments?status=' + value)
            .then(response => setComments(response.data))
            .catch(error => console.log({ error }));
    }, [comments]);

    return (
        <Card>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <AdminMenu />
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{ width: '100%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value="1"
                                    label={<Button variant="outlined" color="success">Onaylanan Cevaplar</Button>}
                                />
                                <Tab value="0"
                                    label={<Button variant="outlined" color="error">Onay Bekleyen Cevaplar</Button>}
                                />
                            </Tabs>
                        </Box>

                        {comments.map(comment => {
                            return (
                                <CommentCard id={comment.id} commentContent={comment.commentContent} expertAnswer={comment.expertAnswer} commentApprovalStatus={comment.commentApprovalStatus} commentCreateTime={comment.commentCreateTime} />
                            )
                        })}
                    </Grid>
                </Grid>
            </Box>
        </Card >
    );
}