
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layout/layout.js'
import FindPW from '../views/acountInfo/findPW.js';
import UpdatePW from '../views/acountInfo/updatePW.js';
import Login from '../views/acountInfo/login.js';
import MainAccountInfo from '../views/acountInfo/mainAcountInfo.js';
import SignUp from '../views/acountInfo/signUp.js';
import MainBoard from '../views/boards/mainBoard.js';
import BasicBoard from '../views/boards/basicBoard.js';
import ReadTaskPage from '../views/readTaskPage.js';

export const RouterInfo = (user = {}, setUser = () => {}) => createBrowserRouter([
  {
    path: "/",
    element: <Layout  user={user} setUser={setUser}  />,
    children: [ 
      {path: "/", element: <MainAccountInfo  user={user} setUser={setUser} />}, 
      {path: "findPW", element: <FindPW  user={user} setUser={setUser} />, },
      {path: "signUp", element: <SignUp  user={user} setUser={setUser} />, },
      {path: "mainAccountInfo", element: <MainAccountInfo  user={user} setUser={setUser} />, },
      {path: "login", element: <Login  user={user} setUser={setUser} />, },
      {path: "mainBoard/:boardType", element: <MainBoard  user={user} setUser={setUser} />,},
      {path: "basicBoard/:listId", element: <BasicBoard  user={user} setUser={setUser} />,},
      {path: "monthlyBoard", element: <MainBoard  user={user} setUser={setUser} />,},
      {path: "readTaskPage", element: <ReadTaskPage  user={user} setUser={setUser} />,},
      {path: "updatePW", element: <UpdatePW  user={user} setUser={setUser} />,},
      {path: "oauth2/authorization/google",
        element: <Navigate to="http://localhost:9099/oauth2/authorization/google" />
      },
    ]
  }
])
