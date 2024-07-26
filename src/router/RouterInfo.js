import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layout/layout.js'

import FindPW from '../views/acountInfo/findPW.js';
import Logout from '../views/acountInfo/logout.js';
import SignUp from '../views/acountInfo/signUp.js';
import UpdateSimplePW from '../views/acountInfo/updateSimplePW.js';
import MainBoard from '../views/boards/boardMain.js';
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
      {
        path: "findPW",
        element: <FindPW />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "basicBoard",
        element: <BasicBoard />,
      },
      {
        path: "dailyBoard",
        element: <DailyBoard />,
      },
      {
        path: "kanbanBoard",
        element: <KanbanBoard />,
      },
      {
        path: "updateSimplePW",
        element: <UpdateSimplePW />,
      },
      {
        path: "monthlyBoard",
        element: <MonthlyBoard />,
      },
      {
        path: "timeLineBoard",
        element: <TimeLineBoard />,
      },
      {
        path: "weeklyBoard",
        element: <WeeklyBoard />,
      },
      {
        path: "readTaskPage",
        element: <ReadTaskPage />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "mainBoard/:boardType",
        element: <MainBoard />,
      },
    ]
  }
])