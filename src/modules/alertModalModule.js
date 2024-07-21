import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModalModule = ({ show, onHide, handleDeleteClick }) => {

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
        <Button variant="secondary" onClick={handleDeleteClick}>{saveBtn}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModalModule;