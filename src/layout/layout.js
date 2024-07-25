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

    const hideSidebar = () => {
        if (sidebarVisible) {
            setSidebarVisible(false);
        }
    };
    return (
        <div onClick={hideSidebar}>
            <MenuBar />
            <div className="icon" onClick={(e) => {e.stopPropagation(); toggleSidebar();}} 
                style={{ zIndex: 1001, }}>
                <i
                    className="fa-solid fa-bars"
                    style={{ color: '#000000' }}
                    alt="Toggle Sidebar"></i>
            </div>
            {sidebarVisible && <SideBar />}
            <div className="layout-content" style={{ position: 'relative' }}>
                {sidebarVisible && (
                    <div
                        className="sidebar-wrapper"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            zIndex: 1000,
                            backgroundColor: 'white',
                        }}
                    >
                        <SideBar />
                    </div>
                )}
                <main className="layout-main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default Layout;