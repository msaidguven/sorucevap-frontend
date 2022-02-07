import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import PostCard from '../Components/PostCard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from '../Sidebar/Sidebar';
import FormCreateComment from '../Form/FormCreateComment';

export default function SinglePage() {

    const params = useParams();
    //const postId = params.postId;

    const [post, setPost] = useState([]);
    //const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get('/posts/' + params.postId)
            .then(response => setPost(response.data))
            .catch(error => console.log({ error }));
    }, [post]);


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={6}>
                    <PostCard postId={post.id} postTitle={post.postTitle} postSefLink={post.postSefLink} postContent={post.postContent} postCreateTime={post.postCreateTime} ></PostCard>
                    <FormCreateComment />
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </Box>
    );
}
