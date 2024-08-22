import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import BasicBoard from './basicBoard';
import MonthlyBoard from './monthlyBoard';
import { useParams, useOutletContext } from 'react-router-dom';
// 메인게시판
const BoardMain = () => {
    const { boardType } = useParams();
    const { tasks, addTask, updateTask, deleteTask, 
        lists, addList, updateList, deleteList } = useOutletContext();
    return (
        <div>
            {boardType === 'basic' ? (
                <BasicBoard
                    tasks={tasks} 
                    addTask={addTask} 
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    lists={lists} 
                    addList={addList} 
                    updateList={updateList}
                    deleteList={deleteList}
                     />
            ) : (
                <MonthlyBoard
                    tasks={tasks} 
                    addTask={addTask} 
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    lists={lists} 
                    addList={addList} 
                    updateList={updateList}
                    deleteList={deleteList}
                     />
            )}
        </div>
    );
};

export default BoardMain;