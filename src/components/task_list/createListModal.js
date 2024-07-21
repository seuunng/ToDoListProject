import React, { useState, useRef } from 'react';

const CreateList = ({ icon, list, count, color }) => {
  const modalRef = useRef(null);
  return (
    <div
      className="modal fade"
      id="showCreateListModal"
      tabIndex="-1"
      aria-labelledby="showCreateListModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex align-items-center line title">
              <h4>Add List</h4>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* <EmojiPicker /> */}
            <div className="d-flex align-items-center choseColor item">
              <div className="colorTitle box">Color&emsp;</div>
              <div className="colorItem box">
                <i className="fa-solid fa-circle" style={{ color: 'red' }}></i>&emsp;
                <i className="fa-solid fa-circle" style={{ color: 'green' }}></i>&emsp;
                <i className="fa-solid fa-circle" style={{ color: 'blue' }}></i>&emsp;
              </div>
            </div>
            <div className="d-flex align-items-center isSmartList item">
              <div className="checkbox box">
                <input type="checkbox" />
                스마트 목록에서 안보이게하고 싶어요
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              취소
            </button>
            <button type="button" className="btn btn-primary">
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateList;