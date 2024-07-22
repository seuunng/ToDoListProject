import React, { useState, useEffect } from 'react';
import '../styles/layout.css';
import MenuBar from '../components/menuBar';
import SideBar from '../components/sideBar';


import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };
  
  
    return(
        <div>
            <MenuBar/>
            <div className="icon" onClick={toggleSidebar}>
                <i 
                className="fa-solid fa-bars" 
                style={{ color: '#000000' }} 
                alt="Toggle Sidebar"></i>
            </div>
            {sidebarVisible && <SideBar />}
           
            <main className="layout-main-content">
                <Outlet />
            </main>
        </div>
    )
}
export default Layout;