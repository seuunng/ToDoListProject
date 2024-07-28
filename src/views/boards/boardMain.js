import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import instance from '../../api/axios'
import BasicBoard from './basicBoard';
import MonthlyBoard from './monthlyBoard';
import { useParams } from 'react-router-dom';


const BoardMain = () => {
    const { boardType } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response_taskData = await instance.get('/tasks/task');
                const data = response_taskData.data
                // console.log(data);
                setTasks(data);
            } catch (error) {
                console.error('Error get taskData:', error);
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
            // console.log(deletedTask.no);
            setTasks(tasks.filter(task => task.no !== deletedTask.no));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            {boardType === 'basic' ? (
                <BasicBoard
                    tasks={tasks} 
                    addTask={addTask} 
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                     />
            ) : (
                <MonthlyBoard
                    tasks={tasks} 
                    addTask={addTask} 
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                     />
            )}
        </div>
    );
};

export default BoardMain;