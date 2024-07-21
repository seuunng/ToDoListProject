import React, { useState, useEffect } from 'react';
import '../styles/layout.css';
import MenuBar from '../components/menuBar';
import SideBar from '../components/sideBar';

import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };
  
  
    return(
        <div>
            <MenuBar/>
            {sidebarVisible && <SideBar />}
            <div className="icon" onClick={toggleSidebar}>
                <i 
                className="fa-solid fa-bars" 
                style={{ color: '#00000' }} 
                alt="Toggle Sidebar"></i>
            </div>
            <main className="layout-main-content">
                <Outlet />
            </main>
        </div>
    )
}
export default Layout;