import React, { useState, useEffect, forwardRef, useContext } from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/basicStyle.css';
import '../styles/datePickerModule.css';
import { Button, Col } from 'react-bootstrap';
import { TaskBoxContext } from '../contexts/taskBoxContext';

const DatePickerModule = ({ show, startDate, endDate, onDateChange,
    selectedButton, setSelectedButton,
    isTimeSet, setIsTimeSet, onCalendarClose}) => {
    const [dateRange, setDateRange] = useState([startDate, endDate]);
    const [timeValue, setTimeValue] = useState('');
    const savedSeleted = JSON.parse(localStorage.getItem('selectedOptions')) || {};
    const [dateFormatTimeInput, setDateFormatTimeInput] = useState(savedSeleted?.time === "24시간" ? "yyyy/MM/dd H:mm" : "yyyy/MM/dd h:mm aa");
    const { isTaskBox } = useContext(TaskBoxContext);
    // 날짜 입력 방식 선택에 따른 TimeValue 설정
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
    // 날짜 출력 형식
    useEffect(() => {
        setDateFormatTimeInput(savedSeleted?.time === "24시간" ? "yyyy/MM/dd H:mm" : "yyyy/MM/dd h:mm aa");
    }, [savedSeleted.time]);
    //  날짜|기간 선택에 따른 상태 변경
    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    };
    // 날짜 수정 기능
    const handleDateChange = (update) => {
        setDateRange(update);
        if (selectedButton === 'PERIOD') {
            onDateChange(update[0], update[1]);
        } else {
            onDateChange(update, null);
        };
    };
    useEffect(() => {
        console.log("DateRange", dateRange);
    }, [dateRange]);
    // timeValue에 따라 IsTimeSet설정 
    useEffect(() => {
        if (timeValue) {
            setIsTimeSet(true);
        } 
    }, []);
    // 날짜 인풋창의 커스텀
    const CustomInput = forwardRef(({ value, onClick, className }, ref) => {
        console.log("CustomInput value:", value);  // 이 줄을 통해 value 확인
        return (
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
                {value || "Select date"}
            </button>
        );
    });
    // 데이터 피커 달력 위 컴포넌트
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
                            marginTop: "4px",
                            marginBottom: "4px",
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
    // 데이터피커 달력 아래 시간 설정 제목
    const CustomTimeLabel = () => (
        <span style={{ fontSize: "16px", marginLeft: "-6px" }}>
            시간 설정
        </span>
    );
    // 데이터피커 달력 아래 시간 설정 버튼
    const CustomTimeInput = ({ onChange }) => {

            return (
        <div className='row' style={{position: "relative"}}>
            <Col>
                <input
                    type="time"
                    value={isTimeSet ? timeValue : ''}
                    onChange={e => {
                        const newValue = e.target.value;
                        onChange(newValue);
                        setTimeValue(newValue);
                        setIsTimeSet(true);
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
                />
            </Col>
            <Col>
                <Button
                    onClick={() => {
                        setTimeValue('');
                        setIsTimeSet(false);
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
                    }} >
                    x
                </Button>
            </Col>
        </div>
    );
};
    return (
        <div className="custom-date-picker" style={{position: "relative"}}>
            <DatePicker
                selected={dateRange[0]}
                onChange={handleDateChange}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                selectsRange={selectedButton === 'PERIOD'}
                onCalendarClose={onCalendarClose} 
                showPopperArrow={false}
                calendarContainer={MyContainer}
                popperPlacement="bottom-start"
                style={{ margin: "10px", padding: "10px" }}
                customInput={<CustomInput className="custom-date-input" />}
                timeInputLabel={<CustomTimeLabel />}
                dateFormat={isTaskBox ? 'MM/dd' : (isTimeSet ? dateFormatTimeInput : "yyyy/MM/dd")}
                showTimeInput
                customTimeInput={<CustomTimeInput value={timeValue} onChange={setTimeValue} />}
            >
                
                {/* 메모 반복및 알림 기능: 추후구현 예정 */}
                
                {/* <div>
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
                </div> */}
            </DatePicker>
        </div>
    );
}

export default DatePickerModule;