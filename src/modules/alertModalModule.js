import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// 경고문 모달
const AlertModalModule = ({ show, onHide, handleALertClick, title, alert, hideBtn, saveBtn }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{alert}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary-outline" onClick={onHide}>{hideBtn}</Button>
        <Button variant="secondary" onClick={handleALertClick}>{saveBtn}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModalModule;