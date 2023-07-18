import React from "react";
import { BsBag, BsCreditCard2Front, BsReceipt } from "react-icons/bs";

const CartTabs = ({ className = '', tabs }) => {
  return (
    <div className={`${className} py-20 max-md:hidden`}>
      <div className="mx-auto max-w-[700px] relative flex ">
        <p className="absolute top-[32%] right-3 w-[90%] h-[1px] bg-slate-400 z-0"></p>
        <div className="mr-auto flex flex-col items-center justify-center gap-8 z-30">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center z-10 border ${tabs === 1 ? " border-red-500 text-white" : "border-slate-600"
              }`}
          >
            <span
              className={`p-5 rounded-full ${tabs === 1
                  ? "bg-red-500 text-white"
                  : "border border-slate-500 text-black bg-white"
                }`}
            >
              <BsBag className="text-[40px]"></BsBag>
            </span>
          </div>
          <span className='text-center text-base font-bold uppercase'>Giỏ hàng</span>
        </div>
        <div className="mx-auto flex flex-col items-center justify-center gap-8 z-30">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center z-10 border ${tabs === 2 ? " border-red-500 text-white" : "border-slate-600"
              }`}
          >
            <span
              className={`p-5 rounded-full ${tabs === 2
                  ? "bg-red-500 text-white"
                  : "border border-slate-500 text-black bg-white"
                }`}
            >
              <BsReceipt className="text-[40px]"></BsReceipt>
            </span>
          </div>
          <span className='text-center text-base font-bold uppercase'>địa chỉ giao hàng</span>
        </div>
        <div className="ml-auto flex flex-col items-center justify-center gap-8 z-30">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center z-10 border ${tabs === 3 ? " border-red-500 text-white" : "border-slate-600"
              }`}
          >
            <span
              className={`p-5 rounded-full ${tabs === 3
                  ? "bg-red-500 text-white"
                  : "border border-slate-500 text-black bg-white"
                }`}
            >
              <BsCreditCard2Front className="text-[40px]"></BsCreditCard2Front>
            </span>
          </div>
          <span className='text-center text-base font-bold uppercase'>thanh toán</span>
        </div>

      </div>
    </div>
  );
};

export default CartTabs;
