import React from 'react';

import { Button, Container, Rating } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FormCreatePost from './Form/FormCreatePost';
import SignIn from './Form/SignIn';

import AdminCategory from './Admin/AdminCategory';
import AdminComments from './Admin/AdminComments';
import AdminPosts from './Admin/AdminPosts';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import HeaderMenu from './HeaderMenu';

import Home from './Pages/Home';
import Category from './Pages/Category';


import SinglePage from './Pages/SinglePage';
import FormCreateUser from './Form/FormCreateUser';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <HeaderMenu></HeaderMenu>
        <hr />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/formPost" element={<FormCreatePost />}></Route>
          <Route path="/cat/:catName" element={<Category />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/soru/:postSefLink/:postId" element={<SinglePage />}></Route>
          <Route path="/girissadress/category" element={<AdminCategory />}></Route>
          <Route path="/girissadress/comments" element={<AdminComments />}></Route>
          <Route path="/girissadress/posts" element={<AdminPosts />}></Route>
          <Route path="/girissadress/createUser" element={<FormCreateUser/>}></Route>
        </Routes>
      </BrowserRouter>
      <hr />
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
      <hr />
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Container>
  );
}

export default App;
