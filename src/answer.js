import React, { useState, useEffect, forwardRef, useContext } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/basicStyle.css';
import '../styles/datePickerModule.css';
import { Button, Col } from 'react-bootstrap';
import DropdownBtn from './dropdownModule';
import { IoMdTime } from "react-icons/io";
import { TaskBoxContext } from '../contexts/taskBoxContext';

const DatePickerModule = ({ startDate, endDate, onDateChange,
    onRepeatClick, initialRepeat, onAlarmClick, initialAlarm, 
    dateFormat, selectedButton, setSelectedButton, onHide, onSave }) => {

    const [dateRange, setDateRange] = useState([startDate, endDate]);
    const [timeValue, setTimeValue] = useState('');
    const dropdownOptionsAlarmTime = ["알림없음", "정각", "5분전", "30분전", "하루전"];
    const dropdownOptionsRepeat = ["반복없음", "매일", "매주", "매달", "매년"];
    const savedSeleted = JSON.parse(localStorage.getItem('selectedOptions'));
    const [dateFormatTimeInput, setDateFormatTimeInput] = useState(savedSeleted.time === "24시간" ? "yyyy/MM/dd H:mm" : "yyyy/MM/dd h:mm aa");
    const { isTaskBox } = useContext(TaskBoxContext); 

    const repeatMappingToKorean = {
        "NOREPEAT": "반복없음",
        "DAILY": "매일",
        "WEEKLY": "매주",
        "MONTHLY": "매달",
        "YEARLY": "매년"
    };
    const alarmMappingToKorean = {
        "NOALARM": "알림없음",
        "ONTIME": "정각",
        "FIVEMINS": "5분전",
        "THIRTYMINS": "30분전",
        "DAYEARLY": "하루전"
    };

    const [selectedOptions, setSelectedOptions] = useState({
        alarmTime: alarmMappingToKorean[initialAlarm] || "알림없음",
        repeat: repeatMappingToKorean[initialRepeat] || "반복없음",
    });

    useEffect(() => {
        setDateRange([startDate, endDate]);
        setSelectedOptions({
            alarmTime: alarmMappingToKorean[initialAlarm] || "알림없음",
            repeat: repeatMappingToKorean[initialRepeat] || "반복없음",
        }); 
    }, [startDate, endDate, initialAlarm, initialRepeat]);

    useEffect(() => {
        console.log(timeValue)
    }, [timeValue]);
    
    useEffect(() => {
        if (dateRange[0]) {
            const date = new Date(dateRange[0]);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            setTimeValue(`${hours}:${minutes}`);
        } else {
            setTimeValue('');
        }
    }, [dateRange]);

    useEffect(() => {
        setDateFormatTimeInput(savedSeleted.time === "24시간" ? "yyyy/MM/dd H:mm" : "yyyy/MM/dd h:mm aa");
    }, [savedSeleted.time]);
    
    const handleDateChange = (update) => {
        setDateRange(update);
        if (selectedButton === 'PERIOD') {
            onDateChange(update[0], update[1]);
        } else {
            onDateChange(update, null);
        }
    };

    const handleOptionSelected = (type, option) => {
        const updatedOptions = ({ ...selectedOptions, [type]: option });
        setSelectedOptions(updatedOptions);
        if (type === 'repeat') {
            onRepeatClick(option);
        }
        if (type === 'alarmTime') {
            onAlarmClick(option);
        }
    };

    const handleButtonClick = (buttonType) => {
        if (buttonType === 'DATE') {
            setDateRange([null, null]);
        }
        setSelectedButton(buttonType);
    };

    const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
        <button className={className} onClick={onClick} ref={ref}
            style={{
                fontSize: "16px",
                textAlign: "left",
                marginLeft: "10px",
                paddingLeft: "0px",
                paddingRight: "0px",
                backgroundColor: "white",
                height: "40px",
                border: "none"
            }}
        >
            {value}
        </button>
    ));

    const MyContainer = ({ className, children }) => {
        return (
            <div >
                <CalendarContainer className={className}>
                    <div className='row centered'
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor: "#f0f0f0",
                            width: "90%",
                            marginLeft: "10px",
                            marginTop: "5px",
                            paddingBottom: "4px",
                            borderRadius: "7px",
                            paddingLeft: "-8px",
                        }}>
                        <Col>
                            <Button onClick={() => handleButtonClick('DATE')} variant="light"
                                style={{
                                    width: "110%",
                                    marginTop: "5px",
                                    marginLeft: "0px",
                                    backgroundColor: selectedButton === 'DATE' ? 'light' : '#f0f0f0',
                                    color: selectedButton === 'DATE' ? 'black' : 'lightgrey',
                                    border: "none"
                                }}
                                className="date-button"
                            >
                                날짜
                            </Button>
                        </Col>
                        <Col >
                            <Button onClick={() => handleButtonClick('PERIOD')} variant="light"
                                style={{
                                    width: "110%",
                                    marginTop: "5px",
                                    paddingRight: "0px",
                                    paddingLeft: "0px",
                                    marginLeft: "-5px",
                                    marginRight: "10px",
                                    backgroundColor: selectedButton === 'PERIOD' ? 'light' : '#f0f0f0',
                                    color: selectedButton === 'PERIOD' ? 'black' : 'lightgrey',
                                    border: "none"
                                }}
                                className="date-button"
                            >
                                기간
                            </Button>
                        </Col>
                    </div>
                    <div style={{ position: "relative" }}>{children}</div>
                </CalendarContainer>
            </div>
        );
    };

    const CustomTimeLabel = () => (
        <span style={{ fontSize: "16px", marginLeft: "-6px" }}>
            시간 설정
        </span>
    );

    const CustomTimeInput = ({ onChange }) => (
        <div className='row'>
            <Col>
                <input
                    type="time"
                    value={timeValue}
                    onChange={e => {
                        const newValue = e.target.value;
                        onChange(newValue);
                        setTimeValue(newValue);

                        if (newValue) {
                            const [hours, minutes] = newValue.split(':');
                            const newDate = new Date(dateRange[0]);
                            newDate.setHours(hours);
                            newDate.setMinutes(minutes);
                            setDateRange([newDate, dateRange[1]]);
                            onDateChange(newDate, dateRange[1]);
                        } else {
                            setDateRange([new Date(dateRange[0]).setHours(0, 0, 0, 0), dateRange[1]]);
                            onDateChange(dateRange[0], dateRange[1]);
                        }
                    }}
                    style={{
                        width: "120px",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "none",
                        marginTop: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginRight: "0"
                    }}
                    placeholder="--:--"
                />
            </Col>
            <Col>
                <Button
                    onClick={() => {
                        setTimeValue('');
                        const newDate = new Date(dateRange[0]);
                        newDate.setHours(0);
                        newDate.setMinutes(0);
                        setDateRange([newDate, dateRange[1]]);
                        onDateChange(newDate, dateRange[1]);
                    }}
                    style={{
                        width: "20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backgroundColor: "white",
                        border: "none",
                        color: "black",
                        marginLeft: "-20px",
                        marginRight: "0"
                    }}
                >
                    x
                </Button>
            </Col>
        </div>
    );

    return (
        <div className="custom-date-picker">
            <DatePicker
                selected={dateRange[0]}
                onChange={handleDateChange}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                selectsRange={selectedButton === 'PERIOD'}
                
                showPopperArrow={false}
                calendarContainer={MyContainer}
                popperPlacement="bottom-start"
                style={{ margin: "10px", padding: "10px" }}
                customInput={<CustomInput className="custom-input" />}
                timeInputLabel={<CustomTimeLabel />}
                dateFormat={isTaskBox ? 'MM/dd' : (timeValue ? dateFormatTimeInput : "yyyy/MM/dd")}
                showTimeInput
                customTimeInput={<CustomTimeInput value={timeValue} onChange={setTimeValue} />}
            >
                <div>
                    <div className="d-flex align-items-center line row">
                        <Col>
                            <h6>반복 설정</h6>
                        </Col>
                        <Col className='righted'>
                            <DropdownBtn
                                options={dropdownOptionsRepeat}
                                selectedOption={selectedOptions.repeat}
                                onOptionSelected={(option) => handleOptionSelected('repeat', option)}
                            />
                        </Col>
                    </div>
                    <div className="d-flex align-items-center line row">
                        <Col>
                            <h6>알림 설정</h6>
                        </Col>
                        <Col className='righted'>
                            <DropdownBtn
                                options={dropdownOptionsAlarmTime}
                                selectedOption={selectedOptions.alarmTime}
                                onOptionSelected={(option) => handleOptionSelected('alarmTime', option)}
                            />
                        </Col>
                    </div>
                </div>
            </DatePicker>
        </div>
    );
}

export default DatePickerModule;