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
                console.log(data);
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
        console.log("Task added:", addedTask);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div>
            {boardType === 'basic' ? (
                <BasicBoard 
                    tasks={tasks} addTask={addTask} />
            ) : (
                <MonthlyBoard 
                    tasks={tasks} addTask={addTask} />
            )}
        </div>
    );
};

export default BoardMain;