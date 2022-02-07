import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { NavLink, Link, useParams } from 'react-router-dom';
import { Alert, Button, Card } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import FormUpdatePost from '../Form/FormUpdatePost';
import AdminMenu from './AdminMenu';
import AlertDialog from '../Components/AlertDialog';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function AdminPosts(props) {

    const [posts, setPosts] = useState([]);

    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const updateApprovePost = (postId) => {
        axios.put('/posts/confirmPost/' + postId, {})
    }

    const updateNotApprovePost = (postId) => {
        axios.put('/posts/notConfirmPost/' + postId, {})
    }


    useEffect(() => {
        axios
            .get('/posts?status=' + value)
            .then(response => setPosts(response.data))
            .catch(error => console.log({ error }));
    }, [posts]);



    const renderElement = (postId) => {
        if (value == "1") {
            return (
                <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => { updateNotApprovePost(postId) }}
                >
                    Onay Kaldır
                </Button>
            );
        } else {
            return (
                <Button
                    size="small"
                    color="success"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => { updateApprovePost(postId) }}
                >
                    Onayla
                </Button>
            );
        }
    }

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
                                    label={<Button variant="outlined" color="success">Onaylanan Sorular</Button>}
                                />
                                <Tab value="0"
                                    label={<Button variant="outlined" color="error">Onay Bekleyen Sorular</Button>}
                                />
                            </Tabs>
                        </Box>


                        {posts.map(post => {
                            return (
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {post.postTitle}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.postContent}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {renderElement(post.id)}
                                        <AlertDialog id={post.id} name="Delete" title="Silme İşlemi" message="Bu soruyu silmek istiyor musunuz? (Bu işlem geri Alınamaz)" field="post" />
                                        <FormUpdatePost postId={post.id} name="Edit Post" />
                                    </CardActions>
                                </Card>
                            )
                        })}
                    </Grid>
                </Grid>
            </Box>
        </Card >
    );

}
