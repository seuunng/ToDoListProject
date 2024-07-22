import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../styles/basicStyle.css';

const SwitchButtonModule = ({ label, disabled, checked, onChange, }) => {
  //   const [isChecked, setIsChecked] = useState(false);

  // const handleChange = () => {
  //   setIsChecked(!isChecked);
  // };

  return (
    <Form>
        <Form.Check 
            type="switch"
            // checked={isChecked}
            onChange={onChange}
            checked={checked}
            disabled={disabled}
            className="form-check-input"
            label={label}
            style={{border:"none"}}
        />
    </Form>
  );
}

export default SwitchButtonModule;