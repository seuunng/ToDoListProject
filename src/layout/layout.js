import React, { useState, useEffect } from 'react';
import '../styles/layout.css';
import MenuBar from '../components/menuBar';
import SideBar from '../components/sideBar';
import { Outlet } from 'react-router-dom';
import instance from '../api/axios';


const Layout = ({setUser, user}) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            instance.get('/auth/session')
                .then(response => {
                    setUser(response.data.user);
                    // console.log("response.data.user", response.data);
                })
                .catch(error => {
                    console.error('Session check failed:', error.response ? error.response.data : error.message);
                    setUser(null);
                });
        }
    }, [setUser]);

    useEffect(() => {
        const fetchTableData = async () => {
            console.log("fetchTableData user.id : ", user.id)
            if (!user || !user.id) {
                console.error('User ID is not available');
                return;
            }
            try {
                const response_taskData = await instance.get(`/tasks/task/${user.id}`);
                const data = Array.isArray(response_taskData.data) ? response_taskData.data : [];

                const response_listData = await instance.get('/lists/list');
                const data_list = Array.isArray(response_listData.data) ? response_listData.data : [];
                
                const tasksWithLists = data.map(task => {
                    if (!task.listNo) {
                        console.warn(`Task with ID ${task.no} does not have a listNo property.`);
                        return { ...task, list: null };
                    }
                    const list = data_list.find(list => list.no === task.listNo);
                    return { ...task, list: list || null };
                });

                setTasks(tasksWithLists);
                setLists(data_list);
            } catch (error) {
                console.error('Error getting data:', error);
                setTasks([]);
                setLists([]);
            }
        }
        if (user) {
            fetchTableData();
        }
    }, [user]);

    const addTask = async (newTask) => {
        try {
            const response = await instance.post('/tasks/task', {
                ...newTask,
                user: user, 
                list: newTask.list ? newTask.list : { no: null } 
            });
            const addedTask = response.data;
            setTasks((prevTasks) => [...prevTasks, addedTask]);
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
            <MenuBar 
                setUser={setUser} 
                user={user}/>
            <div className="icon" onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
                style={{ zIndex: 1001, }}>
                    { user ? 
                <i
                    className="fa-solid fa-bars"
                    style={{ color: '#000000' }}
                    alt="Toggle Sidebar"></i>
                    :''}
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
                        user={user}
                        setUser={setUser}
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
                            user={user}
                            setUser={setUser}
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
                        deleteList,
                        user,
                        setUser
                    
                    }} />
                </main>
            </div>
        </div>
    )
}
export default Layout;