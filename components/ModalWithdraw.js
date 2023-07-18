import accountApis from "@/apis/accountApi";
import { BONUS_TYPE } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";

export default function ModalWithdraw({ showModal, setShowModal, userId, totalBonus }) {
    // console.log('showModal', showModal);
    const [priceBonus, setPriceBonus] = useState(0);
    const [validated, setValidated] = useState(false)
    // const [showModal, setShowModal] = React.useState(false);
    // console.log(priceBonus)
    const withdraw = () => {
        if (Number(totalBonus) === 0) {
            setValidated(true)
            return
        }
        const payload = {
            priceBonus,
            userId,
            type: BONUS_TYPE.REQUEST
        }

        accountApis.withdrawBonus(payload).then(() => {
            toast.success('Bạn đã gửi yêu cầu rút tiền')
            setShowModal()
        }).catch(err => console.log(err))
    }
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    // onClick={setShowModal}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl max-sm:w-[95%]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-4 border-b border-solid border-slate-200 w-[500px] max-sm:w-[95%]">
                                    <h3 className="text-2xl font-bold">
                                        Yêu cầu rút thưởng
                                    </h3>
                                    <button
                                        className=""
                                        onClick={() => {
                                            setShowModal()
                                            setValidated(false)
                                        }}
                                    >
                                        <GrClose className="text-2xl opacity-50"></GrClose>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="flex flex-col items-start gap-3">
                                        <span>Số tiền thường</span>
                                        <div className="w-full">
                                            <div className="relative">
                                                <input
                                                    onChange={(e) => setPriceBonus(e.target.value)}
                                                    required
                                                    min={5000}
                                                    max={totalBonus}
                                                    type="number"
                                                    defaultValue={totalBonus}
                                                    placeholder="Nhập số tiền thưởng cần rút"
                                                    className={`w-full p-2 text-sm outline-none border-[1px] border-gray-200 focus:ring-2 focus:ring-blue-200 rounded-md ${validated && 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 pr-9'}`}
                                                />
                                                {validated && <BiErrorCircle className="text-red-500 text-lg font-bold absolute top-0 right-0 -translate-x-1/2 translate-y-1/2"></BiErrorCircle>}
                                            </div>
                                            {validated && <div className="text-left text-regal-red text-[14px] font-normal">
                                                Vui lòng nhập đúng số tiền muốn rút.<br></br>
                                                Số tiền tối đa bạn được rút là {totalBonus}đ
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-white bg-gray-500 hover:bg-gray-600 rounded-lg font-normal px-4 pt-2 pb-3 text-base outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setShowModal()
                                            setValidated(false)
                                        }}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-red-600 rounded-lg font-normal px-4 pt-2 pb-3 text-base outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={withdraw}
                                    >
                                        Yêu cầu rút
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}