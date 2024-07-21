import React, { useState, useEffect } from 'react';
import MenuBar from '../components/menuBar';
import SideBar from '../components/sideBar';

const Layout = () => {

    return(
        <div>
            <MenuBar/>
            <SideBar/>
        </div>
    )
}
export default Layout;