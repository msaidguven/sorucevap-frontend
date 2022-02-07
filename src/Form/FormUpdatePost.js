import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import { Alert, Button, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';

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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function FormUpdatePosts(props) {

    //const [postTitle, setPostTitle] = useState("");
    //const [postContent, setPostContent] = useState("");
    //const [categoryId, setCategoryId] = useState("");



    const [categorys, setCategory] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/category")
            .then(response => setCategory(response.data))
            .catch(error => console.log({ error }));
    }, []);

    const [post, setPost] = useState([]);
    useEffect(() => {
        axios
            .get('/posts/' + props.postId)
            .then(response => setPost(response.data))
            .catch(error => console.log({ error }));
    }, []);

    const updatePost = () => {
        axios.put('https://example.com/cats/1', {
            //name: 'Tophat Cat'
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small"
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<EditIcon />}
            >
                {props.name}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="lg"
                fullWidth
            >
                <Container>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Modal title
                    </BootstrapDialogTitle>
                    <Box sx={{ width: '80%' }}>
                        <Collapse in={open}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                Success! Create New Post.
                            </Alert>
                        </Collapse>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <TextField
                                    id="fullWidth"
                                    margin="dense" name="postTitle" fullWidth label="Title"
                                    value={post.postTitle}
                                    //onChange={(i) => handleTitle(i.target.value)}
                                    required
                                />
                                <TextField margin="dense" fullWidth name="postContent"
                                    id="outlined-multiline-static"
                                    label="Content"
                                    multiline
                                    rows={9}
                                    value={post.postContent}
                                    //onChange={(i) => handleContent(i.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        //value={age}
                                        label="Age"
                                    //onChange={handleChange}
                                    //onChange={(i) => handleCategoryId(i.target.value)}
                                    >
                                        {categorys.map(category => {
                                            var catSelected;
                                            if (post.categoryId == category.id) {
                                                catSelected = "selected";
                                            }
                                            return (
                                                <MenuItem value={category.id} catSelected>{category.categoryName}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>

                                <Button fullWidth margin="dense"
                                    variant="contained"
                                    style={{
                                        marginTop: '50px',
                                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                        color: 'white'
                                    }}
                                //onClick={handleSubmit}
                                >Post</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Save changes
                        </Button>
                    </DialogActions>
                </Container>
            </BootstrapDialog>
        </div>
    );
}
