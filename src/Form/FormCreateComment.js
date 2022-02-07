import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import SnackbarMesaj from '../AlertOnay/Snackbar';

import { Alert, Button, Card, InputAdornment, OutlinedInput } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CommentCard from '../Components/CommentCard';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function FormCreateComment(props) {
    const [commentContent, setCommentContent] = useState("");

    const params = useParams();
    const postId = params.postId;

    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [snackbarMessage, setSnackBarMessage] = React.useState("");
    
    const [comments, setComments] = useState([]);

    const handleSubmit = () => {
        createComment();
        setOpenSnackBar(true);
        setCommentContent("");
    }

    const createComment = () => {
        axios.post('/comments/createComment', {
            commentContent: commentContent,
            userId: 1,
            postId: postId,
            commentApprovalStatus: 0
        })
            .then(function (response) {
                console.log(response);
                //setSeverity("success");
                //setSnackBarMessage("Yorum eklendi..");
                <SnackbarMesaj severity="success" snackbarMessage="ok"/>
            })
            .catch(function (error) {
                console.log(error);
                setSeverity("warning");
                setSnackBarMessage("Yorum eklenmedi!!");
            });
    }

    useEffect(() => {
        axios
            .get("/comments?postId=" + postId)
            .then(response => setComments(response.data))
            .catch(error => console.log({ error }));
    }, [comments]);

    const handleContent = (value) => {
        setCommentContent(value);
    }

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <>
            <Card>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Stack>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                multiline
                                required
                                placeholder="Comment"
                                inputProps={{ maxLength: 250 }}
                                fullWidth
                                value={commentContent}
                                onChange={(i) => handleContent(i.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button
                                            variant="contained"
                                            style={{
                                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                                color: 'white'
                                            }}
                                            onClick={handleSubmit}
                                        >Post</Button>
                                    </InputAdornment>
                                }
                            >
                            </OutlinedInput>
                        </Grid>
                    </Grid>
                </Box>
            </Card >
            <br />
            {comments.map(comment => {
                return (
                    <CommentCard id={comment.id} commentContent={comment.commentContent} expertAnswer={comment.expertAnswer} commentApprovalStatus={comment.commentApprovalStatus} commentCreateTime={comment.commentCreateTime} />
                )
            })}
        </>
    );
}
