import React, { useRef } from "react";

const CartIcon = ({ className = '', children }) => {

  return (
    <>
      <div className={`flex flex-col w-[300px] p-4 bg-white shadow-lg rounded-lg ${className}`}>
        {/* <span className="mb-2 inline-block text-[#808080]">
          Tìm kiếm sản phẩm
        </span>
        <input
          className="p-2 rounded-lg outline-none bg-[#f8f9fa] border border-[#edeff1] text-sm inline-block"
          type="text"
          placeholder="Nhập từ khóa cần kiếm..."
        ></input> */}
        {children}
      </div>
    </>
  );
};

export default CartIcon;
