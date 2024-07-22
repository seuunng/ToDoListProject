import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../styles/basicStyle.css';

const SwitchButtonModule = ({ label, disabled }) => {
    const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Form>
        <Form.Check 
            type="switch"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="form-check-input"
            label={label}
            style={{border:"none"}}
        />
    </Form>
  );
}

export default SwitchButtonModule;