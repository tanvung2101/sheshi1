import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ className, children, ...props }) => {
  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">{children}</div>
    </>
  );
};

export default Modal;
