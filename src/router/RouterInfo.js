
import React, {useState} from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from '../layout/layout.js'

import FindPW from '../views/acountInfo/findPW.js';
import Logout from '../views/acountInfo/logout.js';
import Login from '../views/acountInfo/login.js';
import MainAccountInfo from '../views/acountInfo/mainAcountInfo.js';
import SignUp from '../views/acountInfo/signUp.js';
import UpdateSimplePW from '../views/acountInfo/updateSimplePW.js';
import MainBoard from '../views/boards/mainBoard.js';
import BasicBoard from '../views/boards/basicBoard.js';
import DailyBoard from '../views/boards/dailyBoard.js';
import KanbanBoard from '../views/boards/kanbanBoard.js';
import MonthlyBoard from '../views/boards/monthlyBoard.js';
import TimeLineBoard from '../views/boards/timeLineBoard.js';
import WeeklyBoard from '../views/boards/weeklyBoard.js';
import ReadTaskPage from '../views/readTaskPage.js';
import LoginSuccess from '../views/acountInfo/loginSuccess.js';


export const RouterInfo = (user = {}, setUser = () => {}) => createBrowserRouter([
  {
    path: "/",
    element: <Layout  user={user} setUser={setUser}  />,
    children: [ 
      { path: "/", element: <MainAccountInfo  user={user} setUser={setUser} />}, 
      {path: "findPW", element: <FindPW  user={user} setUser={setUser} />, },
      {path: "logout", element: <Logout  user={user} setUser={setUser} />,},
      {path: "signUp", element: <SignUp  user={user} setUser={setUser} />, },
      {path: "mainAccountInfo", element: <MainAccountInfo  user={user} setUser={setUser} />, },
      {path: "login", element: <Login  user={user} setUser={setUser} />, },
      {path: "mainBoard/:boardType", element: <MainBoard  user={user} setUser={setUser} />,},
      {path: "basicBoard/:listId", element: <BasicBoard  user={user} setUser={setUser} />,},
      {path: "monthlyBoard", element: <MainBoard  user={user} setUser={setUser} />,},
      {path: "dailyBoard", element: <DailyBoard  user={user} setUser={setUser} />,},
      {path: "kanbanBoard", element: <KanbanBoard  user={user} setUser={setUser} />,},
      {path: "updateSimplePW", element: <UpdateSimplePW  user={user} setUser={setUser} />,},
      {path: "timeLineBoard", element: <TimeLineBoard  user={user} setUser={setUser} />,},
      {path: "weeklyBoard", element: <WeeklyBoard  user={user} setUser={setUser} />,},
      {path: "readTaskPage", element: <ReadTaskPage  user={user} setUser={setUser} />,},
      {path: "oauth2/authorization/google",
        element: <Navigate to="http://localhost:9099/oauth2/authorization/google" />
      },
      {path: "login/oauth2/code/google", element: <LoginSuccess  user={user} setUser={setUser} />,},
      // {path:"/mainBoard", element: <MainBoard />},
      // {path:"/", element: <Navigate to="/mainBoard" />}
    ]
  }
])
