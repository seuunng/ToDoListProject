import './App.css';
import React, {useEffect, useState} from 'react';
import { RouterProvider, Router, Routes, Route, Navigate } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import Logout from './views/acountInfo/logout';
import instance from './api/axios';

//import { CustomerStatusProvider } from './Components/Customer/settingModal/CustomerStatusSettingContext';

function App() {
  const [user, setUser] = useState(null);



  return (
    <div>
      {/* <CustomerStatusProvider> */}
      <RouterProvider router={RouterInfo(user, setUser)}/>
      {/* </CustomerStatusProvider> */}
    </div>
  );
}

export default App;
