import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    week: "선택",
    time: "선택",
    alarmTime: "선택",
    alarmMethod: "선택",
    alarmSound: "선택",
  });

  const [switches, setSwitches] = useState({
    today: false,
    tomorrow: false,
    next7Days: false,
    defaultBox: false,
  });

  return (
    <SettingsContext.Provider value={{ selectedOptions, setSelectedOptions, switches, setSwitches }}>
      {children}
    </SettingsContext.Provider>
  );
};