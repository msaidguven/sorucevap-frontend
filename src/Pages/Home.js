import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from '../Sidebar/Sidebar';
import PostCard from '../Components/PostCard';
const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get('/posts?status=1')
            .then(response => setPosts(response.data))
            .catch(error => console.log({ error }));
    }, [posts]);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={6}>
                    {posts.map(post => {
                        return (
                            <PostCard postId={post.id} postTitle={post.postTitle} postSefLink={post.postSefLink} postContent={post.postContent} postCreateTime={post.postCreateTime} ></PostCard>
                        )
                    })}
                    {
                        //<Post></Post>
                    }
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Home;