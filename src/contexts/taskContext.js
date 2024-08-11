import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
//   const [checked, setChecked] = useState(false);
//   const [isCancelled, setIsCancelled] = useState(false);

//   const value = {
//     checked,
//     setChecked,
//     isCancelled,
//     setIsCancelled,
//   };

//   return (
    // <TaskContext.Provider value={value}>
    //   {children}
    // </TaskContext.Provider>
//   );
};