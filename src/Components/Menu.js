import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import AdminMenu from '../Admin/AdminMenu';



export default function Menu() {

    const [categorys, setCategory] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/category")
            .then(response => setCategory(response.data))
            .catch(error => console.log({ error }));
    }, []);

    return (
        <div>
            <Paper>
                <MenuList>
                    {categorys.map(category => {
                        return (
                            <MenuItem>
                                <ListItemText>
                                    <NavLink
                                        to={`/cat/${category.categorySefLink}`}
                                        style={({ isActive }) => ({ color: isActive ? "red" : "pink" })}
                                    >
                                        {category.categoryName}
                                    </NavLink>
                                </ListItemText>
                                <Divider />
                            </MenuItem>
                        )
                    })}
                </MenuList>
            </Paper>

            <AdminMenu/>
        </div>
    );
}
