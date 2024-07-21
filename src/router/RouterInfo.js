import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layout/layout.js'

import Login from '../views/acountInfo/login.js';
import SignUp from '../views/acountInfo/signUp.js';
import UpdatePW from '../views/acountInfo/updatePW.js';


export const RouterInfo = createBrowserRouter([
    {
      path: "/todolist",
      element: <Layout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
            path: "signUp",
            element: <SignUp />,
          },
          {
            path: "updatePW",
            element: <UpdatePW />,
          },
    ]
}
])