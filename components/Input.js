import React, { forwardRef } from "react";

const Input = ({ className, ...props }, ref) => {
  // console.log(props)
  const disabledaAllowed = 'bg-slate-100 cursor-not-allowed'
  return (
    <>
      <input
        {...props}
        ref={ref}
        className={`h-[45px] px-4 py-2 rounded-md w-full outline-none text-sm ${props.errors
          ? "focus:ring-[4px] focus:ring-red-300 border-[1px] focus:border-red-500 border-red-500"
          : "border border-slate-400 focus:border-slate-600 hover:border-slate-600"
          } ${className} ${props.disabled ? disabledaAllowed : ''}`}
        // id={props.id}
        placeholder={props.placeholder}
        disabled={props.disabled}
      >
        {props.children}
      </input>
    </>
  );
};

export default forwardRef(Input);
