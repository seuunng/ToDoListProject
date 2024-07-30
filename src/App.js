import './App.css';
import React, {useEffect, useState} from 'react';
import { RouterProvider, Router, Routes, Route, Navigate } from 'react-router-dom';
import { RouterInfo } from './router/RouterInfo';
import Logout from './views/acountInfo/logout';

//import { CustomerStatusProvider } from './Components/Customer/settingModal/CustomerStatusSettingContext';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      console.log(`현재 로그인한 유저는 ${user.nickname} 입니다`);
    }
  }, [user]);

  return (
    <div>
      {/* <CustomerStatusProvider> */}
      <RouterProvider router={RouterInfo(user, setUser)}/>
      {/* </CustomerStatusProvider> */}
    </div>
  );
}

export default App;
