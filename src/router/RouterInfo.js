import React from 'react';
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


export const RouterInfo = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [ 
      { path: "/", element: `<MainAccountInfo />` }, 
      {path: "findPW", element: <FindPW />, },
      {path: "logout", element: <Logout />,},
      {path: "signUp", element: <SignUp />, },
      {path: "mainAccountInfo", element: <MainAccountInfo />, },
      {path: "login", element: <Login />, },
      {path: "mainBoard/:boardType", element: <MainBoard />,},
      {path: "basicBoard/:listId", element: <BasicBoard />,},
      {path: "monthlyBoard", element: <MainBoard />,},
      {path: "dailyBoard", element: <DailyBoard />,},
      {path: "kanbanBoard", element: <KanbanBoard />,},
      {path: "updateSimplePW", element: <UpdateSimplePW />,},
      {path: "timeLineBoard", element: <TimeLineBoard />,},
      {path: "weeklyBoard", element: <WeeklyBoard />,},
      {path: "readTaskPage", element: <ReadTaskPage />,},
      {path: "oauth2/authorization/google",
        element: <Navigate to="http://localhost:9099/oauth2/authorization/google" />
      },
      // {path:"/mainBoard", element: <MainBoard />},
      // {path:"/", element: <Navigate to="/mainBoard" />}
    ]
  }
])
