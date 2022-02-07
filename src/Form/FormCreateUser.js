import React, { useState } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import { Alert, Button, Card } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from '../Sidebar/Sidebar';

export default function FormCreateUser(props) {
    //const { userId, userName, refreshPosts } = props;
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passRepeat, setPassRepeat] = useState("");
    const [error, setError] = useState(false);
    const [open, setOpen] = React.useState(false);

    const onClickRegister = async event => {
        event.preventDefault();
        try {
            const response = register();
            setOpen(true);
            //setName("");
            //setLastName("");
            //("");
            //setPassRepeat("");
            console.log(response.data);

        } catch (error) {
            console.log(error.response);
        }
    }

    const onClickLogin = async event => {
        event.preventDefault();
        try {
            const response = register();
            setOpen(true);
            //setName("");
            //setLastName("");
            //("");
            //setPassRepeat("");
            console.log(response.data);

        } catch (error) {
            console.log(error.response);
        }
    }

    const register = () => {
        axios.post('/users/', {
            firstName: userName,
            lastName: userLastName,
            email: email,
            password: pass
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                        
                        <Grid item xs={5}>
                            <TextField margin="dense" fullWidth required
                                error helperText="Incorrect entry."
                                label="Name"
                                onChange={(i) => setUserName(i.target.value)}
                            />

                            <TextField required
                                margin="dense" fullWidth label="LastName"
                                onChange={(i) => setUserLastName(i.target.value)}
                            />

                            <TextField margin="dense" required fullWidth
                                type="email" label="E-Mail"
                                onChange={(i) => setEmail(i.target.value)}
                            />

                            <TextField margin="dense" fullWidth required
                                type="password" label="Password"
                                onChange={(i) => setPass(i.target.value)}
                            />

                            <TextField margin="dense" fullWidth required
                                type="password" label="Password Repeat"
                                onChange={(i) => setPassRepeat(i.target.value)}
                            />

                            <Button fullWidth margin="dense"
                                variant="contained"
                                style={{
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    color: 'white'
                                }}
                                onClick={onClickRegister}
                            >Register</Button>
                        </Grid>

                        <Grid item xs={2}>

                        </Grid>

                        <Grid item xs={5}>
                            <TextField required
                                margin="dense" name="E-Mail" fullWidth label="E-Mail" id="email"
                                onChange={(i) => setEmail(i.target.value)}
                                type="email"

                            />
                            <TextField margin="dense" fullWidth required
                                label="Password"
                                onChange={(i) => setPass(i.target.value)}
                                type="password"
                            />
                            <Button fullWidth margin="dense"
                                variant="contained"
                                style={{
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    color: 'white'
                                }}
                                onClick={onClickLogin}
                            >Login</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Card >
        </>
    );
}
