import React, { useState }  from 'react';
import '../styles/basicStyle.css';

const AcountInfoModal = ({ id, nickname, created_at }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [editableId, setEditableId] = useState(id);
  const [editableNickname, setEditableNickname] = useState(nickname);
  const [editableCreatedAt, setEditableCreatedAt] = useState(created_at);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
  //   <div
  //   className="modal fade acountInfo"
  //   id="acountInfoModal"
  //   tabIndex="-1"
  //   aria-labelledby="acountInfoLabel"
  //   aria-hidden="true"
  // >
  //   <div className="modal-dialog modal-dialog-centered">
  //     <div className="modal-content">
  //       <div className="modal-header">
  //         <div>
  //           <h4>{isEditing ? 'Login' : 'AccountInfo'}</h4>
  //         </div>
  //         <button
  //           type="button"
  //           className="btn-close"
  //           data-bs-dismiss="modal"
  //           aria-label="Close"
  //         ></button>
  //       </div>
  //       <div className="modal-body">
          <div className="acountInfo container">
            <div>
              <div className="d-flex align-items-center line">
                <h5>이메일</h5>
                <div>{!isEditing ? id : <input value={editableId} onChange={(e) => setEditableId(e.target.value)} />}</div>
              </div>
              <div className="d-flex align-items-center line">
                <h5>닉네임</h5>
                <div>{!isEditing ? nickname : <input value={editableNickname} onChange={(e) => setEditableNickname(e.target.value)} />}</div>
              </div>
              <div className="d-flex align-items-center line">
                <h5>가입일</h5>
                <div>{!isEditing ? created_at : <input value={editableCreatedAt} onChange={(e) => setEditableCreatedAt(e.target.value)} />}</div>
              </div>
              <div className="d-flex align-items-center line">
                <h5>간편로그인설정</h5>
                <button className="btn">설정</button>
              </div>
              <div className="d-flex align-items-center line">
                <h5>비밀번호 변경</h5>
                <button className="btn">변경</button>
              </div>
            </div>
            {/* <hr />
            <div className="footer d-flex align-items-center line">
              {!isLoggedIn && isGuest && <h5>회원가입</h5>}
              {!isLoggedIn && isGuest && <h5>게스트 로그인</h5>}
              {!isLoggedIn && !isGuest && <h5 onClick={toggleEdit}>{isEditing ? '로그인' : '로그인'}</h5>}
              {!isLoggedIn && !isGuest && <h5 onClick={toggleEdit}>{isEditing ? '로그인' : '간편로그인'}</h5>}
              {isLoggedIn && <h5>로그아웃</h5>}
              {isLoggedIn && <h5>회원탈퇴</h5>}
            </div> */}
          </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  );
};

export default AcountInfoModal;