import './App.css';
import React from 'react';
import { RouterProvider, Router, Routes, Route, Navigate } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import Logout from './views/acountInfo/logout';

//import { CustomerStatusProvider } from './Components/Customer/settingModal/CustomerStatusSettingContext';

function App() {
  return (
    <div>
      {/* <CustomerStatusProvider> */}
      <RouterProvider router={RouterInfo}/>
      {/* </CustomerStatusProvider> */}
    </div>
  );
}

export default App;
