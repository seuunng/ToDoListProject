import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../styles/basicStyle.css';
// 스위치버튼
const SwitchButtonModule = ({ label, disabled, checked, onChange, }) => {
  return (
    <Form>
        <Form.Check 
            type="switch"
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