import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { Alert, Button, Card, Divider, InputAdornment, ListItemText, MenuItem, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CommentCard from '../Components/CommentCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import AdminMenu from './AdminMenu';

export default function AdminCategory(props) {

    const [categorys, setCategory] = useState([]);
    const params = useParams();
    const postId = params.postId;
    const [isSent, setIsSent] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/category")
            .then(response => setCategory(response.data))
            .catch(error => console.log({ error }));
    }, [categorys]);

    const handleSubmit = () => {
        createNewCategory();
        setIsSent(true);
        setOpen(true);
        setCategoryName("");
        //listPostComment();
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };

    const [categoryName, setCategoryName] = useState("");
    const [parentId, setparentId] = useState("");

    const createNewCategory = () => {
        axios.post('/category/createNewCategory', {
            //parentId: parentId,
            categoryName: categoryName
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deleteCategory = (categoryId) => {
        axios.delete("/category/deleteCategory/" + categoryId, {
            headers: {
                //Authorization: authorizationToken
            },
            data: {
                //source: source
            }
        });
    }

    useEffect(() => {
        axios
            .get("/comments?postId=" + postId)
            .then(response => setComments(response.data))
            .catch(error => console.log({ error }));
    }, [comments]);

    const handleCategory = (value) => {
        setCategoryName(value);
        setIsSent(false);
    }

    return (
        <Card>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <AdminMenu />
                    </Grid>
                    <Grid item xs={6}>
                        <TableContainer>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Category Name</TableCell>
                                        <TableCell align="right">Edit</TableCell>
                                        <TableCell align="right">Delete)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categorys.map(row => {
                                        return (
                                            <TableRow
                                                key={row.categoryName}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.categoryName}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton aria-label="delete" justifyContent="flex-end">
                                                        <Edit />
                                                    </IconButton></TableCell>
                                                <TableCell align="right">
                                                    <IconButton aria-label="delete" justifyContent="flex-end"
                                                        onClick={() => {
                                                            deleteCategory(row.id);
                                                        }}>
                                                        <DeleteIcon />
                                                    </IconButton></TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={3}>
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
                                    Success! Create New Category.
                                </Alert>
                            </Collapse>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        multiline
                                        required
                                        placeholder="New Category"
                                        inputProps={{ maxLength: 250 }}
                                        fullWidth
                                        value={categoryName}
                                        onChange={(i) => handleCategory(i.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                                        color: 'white'
                                                    }}
                                                    onClick={handleSubmit}
                                                >Submit</Button>
                                            </InputAdornment>
                                        }
                                    >
                                    </OutlinedInput>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            </Box>



            <hr />
            {comments.map(comment => {
                return (
                    <CommentCard commentId={comment.id} commentContent={comment.commentContent} commentCreateTime={comment.commentCreateTime} />
                )
            })}

        </Card >
    );
}
