import React, { createContext, useState, useContext } from 'react';

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
