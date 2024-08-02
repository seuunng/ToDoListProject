import './App.css';
import React, {useEffect, useState} from 'react';
import { RouterProvider, Router, Routes, Route, Navigate } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import Logout from './views/acountInfo/logout';
import instance from './api/axios';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  const [user, setUser] = useState(null);



  return (
    <div>
      <SettingsProvider>
        <RouterProvider router={RouterInfo(user, setUser)}/>
      </SettingsProvider>
    </div>
  );
}

export default App;
