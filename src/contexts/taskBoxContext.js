import React, { createContext, useState, useContext } from 'react';
// isTaskBox 상태를 전역에서 사용하기 위한 Context
export const TaskBoxContext = createContext();

export const TaskBoxProvider = ({ children }) => {
    const [isTaskBox, setIsTaskBox] = useState(false);

    return (
        <TaskBoxContext.Provider value={{ isTaskBox, setIsTaskBox }}>
            {children}
        </TaskBoxContext.Provider>
    );
};

export const useTaskBox = () => useContext(TaskBoxContext);
