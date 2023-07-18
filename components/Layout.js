import React from 'react'
import { BiErrorCircle } from "react-icons/bi";

const Layout = ({ children, errors, label, icon }) => {
    return (
        <div className="flex-col w-full mt-4">
            <label
                className="inline-block mb-3 text-sm font-normal text-black"
                htmlFor=""
            >
                {label}
            </label>
            <div className="relative">
                {children}
                {errors && icon && (
                    <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2">
                        <BiErrorCircle className="text-lg text-red-500" />
                    </span>
                )}
            </div>
            <span className="font-sans text-sm font-normal text-red-500">
                {errors}
            </span>
        </div>
    )
}

export default Layout