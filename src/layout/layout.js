import React, { useState, useEffect } from 'react';
import '../styles/layout.css';
import MenuBar from '../components/menuBar';
import SideBar from '../components/sideBar';
import { Outlet } from 'react-router-dom';
import instance from '../api/axios';


const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [lists, setLists] = useState([]);
    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response_taskData = await instance.get('/tasks/task');
                const data = response_taskData.data;
                setTasks(data);

                const response_listData = await instance.get('/lists/list');
                const data_list = response_listData.data;
                // console.log(data_list);
                setLists(data_list);
            } catch (error) {
                console.error('Error getting data:', error);
            }
        }
        fetchTableData();
    }, []);

    const addTask = async (newTask) => {
        try {
            const response = await instance.post('/tasks/task', newTask);
            const addedTask = response.data;
            setTasks([...tasks, addedTask]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (updatedTask) => {
        try {
            const response = await instance.put(`/tasks/task/${updatedTask.no}`, updatedTask);
            const updatedTasks = tasks.map(task =>
                task.no === updatedTask.no ? response.data : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (deletedTask) => {
        try {
            await instance.delete(`/tasks/task/${deletedTask.no}`);
            setTasks(tasks.filter(task => task.no !== deletedTask.no));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const addList = async (newList) => {
        try {
            const response = await instance.post('/lists/list', newList);
            const addedlist = response.data;
            setLists([...lists, addedlist]);
        } catch (error) {
            console.error('Error adding list:', error);
        }
    };

    const updateList = async (updatedList) => {
        try {
            const response = await instance.put(`/lists/list/${updatedList.no}`, updatedList);
            const updatedlists = lists.map(list =>
                list.no === updatedList.no ? response.data : list
            );
            setLists(updatedlists);
        } catch (error) {
            console.error('Error updating list:', error);
        }
    };

    const deleteList = async (deletedList) => {
        try {
            await instance.delete(`/lists/list/${deletedList.no}`);
            setLists(lists.filter(list => list.no !== deletedList.no));
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };
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
            <div className="icon" onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
                style={{ zIndex: 1001, }}>
                <i
                    className="fa-solid fa-bars"
                    style={{ color: '#000000' }}
                    alt="Toggle Sidebar"></i>
            </div>
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
                    <SideBar
                        toggleSidebar={toggleSidebar}
                        tasks={tasks}
                        addTask={addTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        lists={lists}
                        addList={addList}
                        updateList={updateList}
                        deleteList={deleteList}
                    />
                </div>
            )}
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
                        <SideBar
                            toggleSidebar={toggleSidebar}
                            tasks={tasks}
                            addTask={addTask}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                            lists={lists}
                            addList={addList}
                            updateList={updateList}
                            deleteList={deleteList}
                        />
                    </div>
                )}
                <main className="layout-main-content">
                    <Outlet context={{
                        tasks,
                        addTask,
                        updateTask,
                        deleteTask,
                        lists,
                        addList,
                        updateList,
                        deleteList
                    }} />
                </main>
            </div>
        </div>
    )
}
export default Layout;