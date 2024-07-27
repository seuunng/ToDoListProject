import React from 'react';
import '../../styles/basicStyle.css';
import { MdOutlinePushPin } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const setTask = () => {
  return (
    <div>
      <div><MdOutlinePushPin /> Pin</div>
      <div><MdCancelPresentation /> Won't Do</div>
      <div><FaRegStickyNote /> Open as sticky note</div>
      <div><MdLocalPrintshop /> Print</div>
      <div><RiDeleteBin6Line /> Delete</div>
    </div>
  );
};

export default setTask;