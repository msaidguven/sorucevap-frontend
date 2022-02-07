import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { Card, CardContent } from '@mui/material';

export default function AdminMenu() {

    const [categorys, setCategory] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/category")
            .then(response => setCategory(response.data))
            .catch(error => console.log({ error }));
    }, []);

    return (
        <Paper>
            <Card>
                <CardContent>
                    Admin Menu
                </CardContent>

                <MenuList>
                    <MenuItem>
                        <ListItemText>
                            <NavLink
                                to="/formPost"
                                style={({ isActive }) => ({ color: isActive ? "red" : "" })}
                            >
                                formPost
                            </NavLink>
                        </ListItemText>


                    </MenuItem>
                    <MenuItem>
                        <ListItemText>
                            <NavLink
                                to="/girissadress/category"
                                style={({ isActive }) => ({ color: isActive ? "red" : "" })}
                            >
                                Kategoriler
                            </NavLink>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>
                            <NavLink
                                to="/girissadress/comments"
                                style={({ isActive }) => ({ color: isActive ? "red" : "" })}
                            >
                                Yorumlar
                            </NavLink>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>
                            <NavLink
                                to="/girissadress/posts"
                                style={({ isActive }) => ({ color: isActive ? "red" : "" })}
                            >
                                Posts
                            </NavLink>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>
                            <NavLink
                                to="/girissadress/createUser"
                                style={({ isActive }) => ({ color: isActive ? "red" : "" })}
                            >
                                Create User
                            </NavLink>
                        </ListItemText>
                    </MenuItem>
                </MenuList>
            </Card>
        </Paper>
    );
}
