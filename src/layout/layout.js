import React, { useState, useEffect } from 'react';
import MenuBar from '../components/menuBar';
import SideBar from '../components/sideBar';

import { Outlet, Link } from 'react-router-dom';

const Layout = () => {

    return(
        <div>
            <MenuBar/>
            <SideBar/>
            <main className="layout-main-content">
                <Outlet />
            </main>
        </div>
    )
}
export default Layout;