import { DELIVERY_METHOD_MAP, PAYMENT_METHOD_MAP } from "@/constants";
import React from "react";

const OrderContent = ({ orderSearchItem, address }) => {
  // console.log('orderSearchItem', orderSearchItem)
  return (
    <div className="flex items-start justify-start w-full flex-wrap max-md:flex-col">
      <div className="flex flex-col w-[25%] text-center pr-3 max-md:w-full max-md:mt-4">
        <div className="py-2 border-b-[1px] border-b-gray-300">
          <span className="uppercase font-bold text-[16px]">
            địa chỉ nhận hàng
          </span>
        </div>
        {orderSearchItem && (
          // <div className="flex flex-col items-center leading-6">
          <>
            <span className="text-base font-normal leading-6 text-center">
              {orderSearchItem.address}
            </span>
            <span className="text-base font-normal leading-6 text-center">
              {address.addressWard}
            </span>
            <span className="text-base font-normal leading-6 text-center">
              {address.addressDistrict}
            </span>
            <span className="text-base font-normal leading-6 text-center">
              {address.addressCity}
            </span>
            <span className="text-base font-normal leading-6 text-center">
              {orderSearchItem?.telephone}
            </span>
          </>
          // </div>
        )}
      </div >
      <div className="flex flex-col w-[25%] text-center px-3 max-md:w-full max-md:mt-4">
        <div className="py-2 border-b-[1px] border-b-gray-300">
          <span className="uppercase font-bold text-[16px]">
            ĐƠN VỊ GIAO HÀNG
          </span>
        </div>
        <p className="text-base font-medium leading-6 text-center">
          {orderSearchItem &&
            DELIVERY_METHOD_MAP.find((e) => e.value === orderSearchItem.shipId)?.label}
        </p>
      </div>
      <div className="flex flex-col w-[25%] text-center px-3 max-md:w-full max-md:mt-4">
        <div className="py-2 border-b-[1px] border-b-gray-300">
          <span className="uppercase font-medium text-[16px]">
            phương thức thanh toán
          </span>
        </div>
        <p className="text-base font-medium leading-6 text-center">
          {orderSearchItem &&
            PAYMENT_METHOD_MAP.find(
              (e) => e.value === orderSearchItem?.orderPayment?.paymentMethod
            )?.label}
        </p>
      </div>
      <div className="flex flex-col w-[25%] text-center pl-3 max-md:w-full max-md:mt-4">
        <div className="py-2 border-b-[1px] border-b-gray-300">
          <span className="uppercase font-bold text-[16px]">GHI CHÚ</span>
        </div>
        <p className="text-base font-normal leading-6 text-center">
          {orderSearchItem?.note}
        </p>
      </div>
    </div>
  );
};

export default OrderContent;
