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
      <RouterProvider router={RouterInfo}>
        <Routes>
          <Route path="/oauth2/authorization/google"
            element={<Navigate to="http://localhost:9099/oauth2/authorization/google" />} />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/*" element={<RouterInfo />} /> */}
          {/* <Route path="/" element={<MyComponent />} /> */}
        </Routes>
      </RouterProvider>
      {/* </CustomerStatusProvider> */}
    </div>
  );
}

export default App;
