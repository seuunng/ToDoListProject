import React, { useImperativeHandle }  from 'react';
import '../../styles/basicStyle.css';

const ReadTaskModal = React.forwardRef(({ read_date, read_tasktitle, read_description, read_listtitle }, ref) => {
  const closeModal = () => {
    const modal = new window.bootstrap.Modal(document.getElementById('readTaskModal'));
    modal.hide();
  };
  const openModal = () => {
    const modal = new window.bootstrap.Modal(document.getElementById('readTaskModal'));
    modal.show();
  };
  React.useImperativeHandle(ref, () => ({
    openModal,
  }));
  return (
    <div
      className="modal fade ReadTaskModal"
      id="readTaskModal"
      tabIndex="-1"
      aria-labelledby="readTaskModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex align-items-center line">
              {/* 여기에 필요한 컴포넌트를 넣으세요 */}
              {/* <CompletedTaskCheckBox /> */}
              {/* <DatePicker selectedDate={new Date(read_date)} /> */}
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex align-items-center line">
              <span className="task-title">
                <h4>{read_tasktitle}</h4>
              </span>
              <span className="flag-icon">
                <i className="fa-regular fa-flag"></i>
              </span>
            </div>
            <div className="description">{read_description}</div>
          </div>
          <hr />
          <div className="d-flex align-items-center line">
            <span className="list-title">{read_listtitle}</span>
            <span className="setting-icon">
              <i className="fa-solid fa-ellipsis"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ReadTaskModal;