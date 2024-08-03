
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastModule = ({title, subTitle, content}) => {

  const showToast = () => {
    toast.info(
      <div>
        <strong>{title}</strong>
        <div>{subTitle}</div>
        <div>{content}</div>
      </div>
    );
  };

  // useEffect 등을 사용하여 특정 조건에서 showToast를 호출할 수 있습니다.
  React.useEffect(() => {
    showToast();
  }, []); // 이 예시에서는 컴포넌트가 마운트될 때 토스트를 표시합니다.

  return <ToastContainer />;
};

export default ToastModule;