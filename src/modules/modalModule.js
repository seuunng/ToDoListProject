import * as React from 'react'
import '../styles/basicStyle.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalModule = ({ show, onHide, modalTitle, context, btnTitle, btnSubTitle, onSubButtonClick }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {context}
      </Modal.Body>
      {btnTitle && 
      <Modal.Footer>
        {btnSubTitle && <Button onClick={onSubButtonClick} variant="outline-secondary">{btnSubTitle}</Button>}
        <Button onClick={onHide}>{btnTitle}</Button>
      </Modal.Footer>}
    </Modal>
  );
}

export default ModalModule;