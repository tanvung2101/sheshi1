import React, { useState, forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const InputPassword = ({ label, errors, className, ...props }, ref) => {
    const [show, setShow] = useState()
    return (
        <div className="flex-col mt-2 w-full">
            <label
                className="inline-block mb-3 text-sm font-normal text-black"
                htmlFor=""
            >
                {label}
            </label>
            <div className="relative">
                <input
                    ref={ref}
                    {...props}
                    type={show ? "password" : "text"}
                    className={`w-full px-4 py-2 rounded-md outline-none text-sm h-[45px] ${className} ${errors
                        ? "focus:ring-[4px] focus:ring-red-300 border-[1px] focus:border-red-500 border-red-500"
                        : "border border-slate-400 focus:border-slate-600"
                        }`}
                />
                <span
                    className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2"
                    onClick={() => setShow(!show)}
                >
                    {show ? (
                        <AiOutlineEyeInvisible className="opacity-60"></AiOutlineEyeInvisible>
                    ) : (
                        <AiOutlineEye className="opacity-60"></AiOutlineEye>
                    )}
                </span>
            </div>
            <div className="font-sans text-sm font-normal text-red-500 mt-1">
                {errors}
            </div>
        </div>
    )
}

export default forwardRef(InputPassword)