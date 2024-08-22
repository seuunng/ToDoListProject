import React, { useState, useEffect } from 'react';
import '../styles/layout.css';
import MenuBar from '../components/menuBar';
import SideBar from '../components/sideBar';
import { Outlet } from 'react-router-dom';
import instance from '../api/axios';
import { FaRegCalendarCheck } from "react-icons/fa";
import { FiSunrise } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { BsCalendarWeek } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoReorderThree } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// 전체 애플리케이션의 레이아웃을 구성하는 컴포넌트: 메뉴바, 사이드바, 각페이지
// 할일 및 목록의 데이터를 백으로 부터 받아와 로컬 상태로 관리
const Layout = ({ setUser, user }) => {
    const navigate = useNavigate();

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [lists, setLists] = useState([]);
    const [smartLists, setSmartLists] = useState([]);
    const [checked, setChecked] = useState(false);
    const [checkedTasks, setCheckedTasks] = useState({});
    const [isCancelled, setIsCancelled] = useState(false);
    const [isSmartList, setIsSmartList] = useState(null);
    // task 및 list 조회
    const fetchTableData = async () => {
        if (!user || !user.id) {
            console.error('User ID is not available');
            return;
        }

        try {
            // task 조회
            const response_taskData = await instance.get(`/tasks/task/${user.id}`);
            const data = Array.isArray(response_taskData.data) ? response_taskData.data : [];
            // list 조회
            const response_listData = await instance.get('/lists/list');
            const data_list = Array.isArray(response_listData.data) ? response_listData.data : [];
            // smartList 조회
            const response_smartListsData = await instance.get('/smartLists/list');
            const data_smartList = Array.isArray(response_smartListsData.data) ? response_smartListsData.data : [];
            // 아이콘을 타이틀에 따라 설정하는 함수
            const getSmartListIcon = (title) => {
                switch (title) {
                    case '모든 할 일':
                        return <FiInbox />;
                    case '오늘 할 일':
                        return <FaRegCalendarCheck />;
                    case '내일 할 일':
                        return <FiSunrise />;
                    case '다음주 할 일':
                        return <BsCalendarWeek />;
                    case '완료한 할 일':
                        return <FaCheck />;
                    case '취소한 할 일':
                        return <IoClose />;
                    default:
                        return <IoReorderThree />;
                }
            };
            // 스마트리스트에 아이콘 추가
            const smartListsWithIcons = data_smartList.map(smartList => ({
                ...smartList,
                icon: getSmartListIcon(smartList.title),
            }));
            // 할일이 속한 리스트 번호와 일치하는 리스트만 필터링
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
            setSmartLists(smartListsWithIcons);
            // 상태가 completed인 할일의 상태를 저장하는 기능
            const initialChecked = tasksWithLists.reduce((acc, task) => {
                acc[task.no] = task.taskStatus === 'COMPLETED';
                return acc;
            }, {});
            setCheckedTasks(initialChecked);
        } catch (error) {
            console.error('Error getting data:', error);
            setTasks([]);
            setLists([]);
        }
    };
    // 현재 세션이 유효한지 확인하는 기능
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            instance.get('/auth/session')
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(error => {
                    console.error('Session check failed:', error.response ? error.response.data : error.message);
                    setUser(null);
                    navigate('/mainAccountInfo');
                });
        }
    }, [setUser]);
    // 유저가 있을때 테스크와 리스트를 초기화
    useEffect(() => {
        if (user) {
            fetchTableData();
        }
    }, [user]);
    // 새로고침으로 테스크와 리스틀르 다시 받아오는 함수
    const refreshTasks = async () => {
        await fetchTableData();
    };
    // 할일 생성
    const addTask = async (newTask) => {
        try {
            const response = await instance.post('/tasks/task', {
                ...newTask,
                user: user,
                list: newTask.listNo ? newTask.listNo : { no: null }
            });
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    // 할일 수정
    const updateTask = async (updatedTask) => {
        try {
            const response = await instance.put(`/tasks/task/${updatedTask.no}`, updatedTask);
            const updatedTasks = tasks.map(task =>
                task.no === updatedTask.no ? response.data : task
            );
            setTasks(updatedTasks);
            await refreshTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    // 할일 삭제
    const deleteTask = async (taskId) => {
        try {
            const response = await instance.put(`/tasks/${taskId}/status`, {
                status: "DELETED",
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            toast.success(`메모가 삭제되었습니다.`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await refreshTasks();
            return response;
        } catch (error) {
            console.error('Error deleteList: ', error);
            throw error;
        }
    };
    // 리스트 추가
    const addList = async (newList) => {
        try {
            const response = await instance.post('/lists/list', newList);
            const addedlist = response.data;
            setLists([...lists, addedlist]);
        } catch (error) {
            console.error('Error adding list:', error);
        }
    };
    // 리스트 수정
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
    // 리스트 삭제
    const deleteList = async (deletedList) => {
        try {
            const response = await instance.put(`/lists/list/${deletedList.no}`, {
                title: deletedList.title,
                icon: deletedList.icon,
                color: deletedList.color,
                isDeleted: true
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const updatedLists = lists.filter(list => list.no !== deletedList.no);
            // 상태 업데이트로 컴포넌트가 다시 렌더링되도록 함
            setLists(updatedLists);
            toast.success(`리스트가 삭제되었습니다.`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error updating list:', error);
        }
    };
    // 사이드바 토글 기능
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    // 배경 선택시 사이드바 숨김 기능
    const hideSidebar = () => {
        if (sidebarVisible) {
            setSidebarVisible(false);
        }
    };
    // 할일의 상태 수정
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const response = await instance.put(`/tasks/${taskId}/status`, {
                status: newStatus,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            await refreshTasks();
            return response;
        } catch (error) {
            console.error('Error updateTaskStatus:', error);
            throw error;
        }
    }
    // 체크박스 상태 변경 기능
    const handleCheckboxChange = async (taskId) => {
        let newStatus;
        const task = tasks.find(task => task.no === taskId);
        if (!task) {
            console.warn('Task not found');
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskStartDate = new Date(task.startDate);
        if (checkedTasks[taskId]) {
            if (taskStartDate.getTime() < today.getTime()) {
                newStatus = 'OVERDUE'; 
                newStatus = 'PENDING'; 
            }
        } else {
            newStatus = 'COMPLETED';
        };
        setCheckedTasks(prevChecked => ({ ...prevChecked, [taskId]: !prevChecked[taskId] }));
        setChecked(newStatus === 'COMPLETED');
        setIsCancelled(newStatus === 'CANCELLED');
        try {
            await updateTaskStatus(taskId, newStatus);
            await refreshTasks(); // 상태 변경 후 테스크를 새로고침
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }
    // 체크박스상태를 취소로 수정
    const handleCancel = async (task) => {
        if (!task || !task.no) {
            console.warn('Task object is missing or task.no is undefined');
            return; // 작업을 중단하고 함수 실행을 멈춤
        }
        const newStatus = 'CANCELLED';
        if (task && task.no) {
            try {
                const response = await instance.put(`/tasks/${task.no}/status`, {
                    status: newStatus,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.status === 200) {
                    await refreshTasks();
                    setIsCancelled(newStatus === 'CANCELLED');
                } else {
                    console.error('Failed to update task status');
                }
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        } else {
            console.error('Task object is missing or task.no is undefined');
        }
    };
    // 체크 박스 상태의 취소를 취소
    const handleReopen = async (task) => {
        let newStatus;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskStartDate = new Date(task.startDate);
        if (taskStartDate.getTime() < today.getTime()) {
            newStatus = 'OVERDUE'; // 과거 날짜이면 OVERDUE
        } else {
            newStatus = 'PENDING'; // 오늘 또는 미래 날짜이면 PENDING
        }
        if (task && task.no) {
            try {
                const response = await instance.put(`/tasks/${task.no}/status`, {
                    status: newStatus,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.status === 200) {
                    await refreshTasks();
                    setIsCancelled(newStatus === 'CANCELLED');
                } else {
                    console.error('Failed to update task status');
                }
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        } else {
            console.error('Task object is missing or task.no is undefined');
        }
    };
    
    return (
        <div onClick={hideSidebar}>
            <MenuBar
                setUser={setUser}
                user={user}
                lists={lists}
                checked={checked}
                setChecked={setChecked}
                isCancelled={isCancelled}
                setIsCancelled={setIsCancelled}
                handleCancel={handleCancel}
                handleCheckboxChange={handleCheckboxChange}
                smartLists={smartLists}
                handleReopen={handleReopen}
            />
            <div className="icon" onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
                style={{ zIndex: 1001, }}>
                {user ?
                    <i
                        className="fa-solid fa-bars"
                        style={{ color: '#000000' }}
                        alt="Toggle Sidebar"></i>
                    : ''}
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
                        checked={checked}
                        setChecked={setChecked}
                        isCancelled={isCancelled}
                        setIsCancelled={setIsCancelled}
                        handleCancel={handleCancel}
                        handleCheckboxChange={handleCheckboxChange}
                        smartLists={smartLists}
                        handleReopen={handleReopen}
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
                            checked={checked}
                            setChecked={setChecked}
                            isCancelled={isCancelled}
                            setIsCancelled={setIsCancelled}
                            handleCancel={handleCancel}
                            handleCheckboxChange={handleCheckboxChange}
                            smartLists={smartLists}
                            handleReopen={handleReopen}
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
                        setUser,
                        checked,
                        setChecked,
                        isCancelled,
                        setIsCancelled,
                        handleCancel,
                        handleCheckboxChange,
                        smartLists,
                        setSmartLists,
                        isSmartList,
                        setIsSmartList,
                        handleReopen
                    }} />
                </main>
            </div>
        </div>
    )
}
export default Layout;