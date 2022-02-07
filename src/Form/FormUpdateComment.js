import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function FormUpdateComment(props) {
    const commentId = props.commentId;
    const [commentContent, setCommentContent] = useState(props.commentContent);
    const [open, setOpen] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [snackbarMessage, setSnackBarMessage] = React.useState("");

    const updateComment = () => {
        axios.put('/comments/updateComment/' + commentId, {
            'commentContent': commentContent
        })
            .then(response => {
                console.log(response);
                setSeverity("success");
                setSnackBarMessage("Yorum güncelleme başarılı..");
            })
            .catch(error => {
                console.log(error);
                setSeverity("warning");
                setSnackBarMessage("Yorum güncellemedi.");
            });
        setOpenSnackBar(true);
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
        setOpenSnackBar(false);
    };
    const handleClose = () => {
        setOpenSnackBar(false);
        setOpen(false);
    };
    const handleContent = (value) => {
        setCommentContent(value);
    }

    return (
        <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Stack>

            <i onClick={handleClickOpen}>
                <EditIcon />
                Edit Comment
            </i>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
                fullWidth
            >
                <Container>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Modal title
                    </BootstrapDialogTitle>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField margin="dense" fullWidth name="postContent"
                                    id={commentId}
                                    label="Comment Content"
                                    multiline
                                    rows={6}
                                    value={commentContent}
                                    onChange={(i) => handleContent(i.target.value)}
                                    require
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <DialogActions>
                        <Button autoFocus margin="dense"
                            variant="contained"
                            style={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white'
                            }}
                            onClick={updateComment}
                        >
                            Update Comment
                        </Button>
                    </DialogActions>
                </Container>
            </BootstrapDialog>
        </div>
    );
}
