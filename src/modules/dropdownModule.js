import * as React from 'react'
import { Dropdown } from 'react-bootstrap';
import '../styles/basicStyle.css';
// 드롭박스 
const DropdownModule = ({ onOptionSelected, disabled, selectedOption, handleSelect, options }) => {
  return (
    <Dropdown style={{fontSize: '14px'}}>
      <Dropdown.Toggle variant="outline-secondary" style={{fontSize: '14px'}}>
        {selectedOption}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option, index) => (
          <Dropdown.Item 
          key={index} 
          onClick={() => onOptionSelected(option)}
          disabled={disabled}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownModule;