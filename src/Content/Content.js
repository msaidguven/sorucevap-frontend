import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostCard from '../Components/PostCard';

export default function Content() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/posts")
            .then(response => setPosts(response.data))
            .catch(error => console.log({ error }));
    }, []);
    return (
        <div>
            {posts.map(post => {
                return (
                    <PostCard postTitle={post.postTitle} postContent={post.postContent} postCreateTime={post.postCreateTime} ></PostCard>
                )
            })
            }
        </div>
    );
}
