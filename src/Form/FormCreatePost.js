import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import { Alert, Button, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import Sidebar from '../Sidebar/Sidebar';


export default function FormCreatePost(props) {
    //const { userId, userName, refreshPosts } = props;
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    //const [isSent, setIsSent] = useState(false);

    const [open, setOpen] = React.useState(false);

    const [categorys, setCategory] = useState([]);


    const handleSubmit = () => {
        savePost();
        setOpen(true);
        setPostTitle("");
        setPostContent("");
        //refreshPosts();
    }




    const savePost = () => {
        axios.post('/posts/createPost', {
            postTitle: postTitle,
            postContent: postContent,
            userId: 1,
            categoryId: categoryId,
            postApprovalStatus: 0
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleTitle = (value) => {
        setPostTitle(value);
    }

    const handleContent = (value) => {
        setPostContent(value);
    }

    const handleCategoryId = (value) => {
        setCategoryId(value);
    }


    useEffect(() => {
        axios
            .get("http://localhost:8080/category")
            .then(response => setCategory(response.data))
            .catch(error => console.log({ error }));
    }, []);

    return (
        <>
        <Card>
            <Box sx={{ width: '100%' }}>
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
                    <Grid item xs={3}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense" name="postTitle" fullWidth label="Title" id="fullWidth"
                            value={postTitle}
                            onChange={(i) => handleTitle(i.target.value)}
                            required
                        />
                        <TextField margin="dense" fullWidth name="postContent"
                            id="outlined-multiline-static"
                            label="Content"
                            multiline
                            rows={9}
                            value={postContent}
                            onChange={(i) => handleContent(i.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={3}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" required>Categories</InputLabel>
                            <Select
                                
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={age}
                                label="Age"
                                //onChange={handleChange}
                                onChange={(i) => handleCategoryId(i.target.value)}

                            >
                                {categorys.map(category => {
                                    return (
                                        <MenuItem value={category.id}>{category.categoryName}</MenuItem>
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
                            onClick={handleSubmit}
                        >Post</Button>
                    </Grid>
                </Grid>
            </Box>

        </Card >

        </>
    );
}
