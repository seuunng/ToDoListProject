import './App.css';
import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import { SettingsProvider } from './contexts/SettingsContext';
import { TaskBoxProvider } from './contexts/taskBoxContext';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <ToastContainer />
      <GoogleOAuthProvider>
        <SettingsProvider>
          <TaskBoxProvider>
            <RouterProvider router={RouterInfo(user, setUser)} />
          </TaskBoxProvider>
        </SettingsProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
