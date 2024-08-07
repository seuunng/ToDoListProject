import './App.css';
import React, { useEffect, useState } from 'react';
import { RouterProvider, Router, Routes, Route, Navigate } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import Logout from './views/acountInfo/logout';
import instance from './api/axios';
import { SettingsProvider } from './contexts/SettingsContext';
import { TaskBoxProvider } from './contexts/taskBoxContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(null);



  return (
    <div>
      <ToastContainer />
      <SettingsProvider>
      <TaskBoxProvider> 
        <RouterProvider router={RouterInfo(user, setUser)} />
        </TaskBoxProvider>
      </SettingsProvider>
    </div>
  );
}

export default App;
