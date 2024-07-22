
import React from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';

const toastlModule = () => {

  return (
    <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        limit={1}
    />
  );
};

export default toastlModule;