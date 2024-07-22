import * as React from 'react'
import Button from 'react-bootstrap/Button';
import '../styles/basicStyle.css';

const BasicButtonModule = ({ variant, text, disabled, onClick }) => {
  return (
    <Button variant={variant} disabled={disabled} onClick={onClick}>
        {text}
    </Button>
  );
}

export default BasicButtonModule;