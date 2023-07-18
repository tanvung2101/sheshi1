import React from 'react'

const MenuNavbar = ({ setShow }) => {
    return (
        <div
            onClick={setShow}
            className="w-[30px] h-[15px] hidden transition-all duration-700 cursor-pointer ease-in group max-lg:mr-5 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:justify-between max-md:flex">
            <span className="w-[85%] transition-all ease-in group-hover:w-[100%] h-[3px] bg-slate-600"></span>
            <span className="w-[70%] transition-all ease-in group-hover:w-[100%] h-[2px] bg-slate-600"></span>
            <span className="w-[85%] transition-all ease-in group-hover:w-[100%] h-[3px] bg-slate-600"></span>
        </div>
    )
}

export default MenuNavbar