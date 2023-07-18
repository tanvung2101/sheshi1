import React from "react";

const Button = ({ children, className, hiddent = false, type = "submit", onClick, disabled, loading = false, ...props }) => {
  return (
    <>
      <button
        {...props}
        onClick={onClick}
        className={`w-full justify-center gap-3 font-serif text-base font-light text-white rounded-md cursor-pointer bg-regal-red ${className}`}
        type={type}
        disabled={disabled || loading}
      >
        {/* {loading && <div className="w-5 h-5 rounded-full border-[4px] border-white border-r-[4px] border-r-transparent animate-spin"></div>}
        {children} */}
        <div className={`flex items-center justify-center gap-3 rounded-md px-3 py-2 ${loading || disabled ? "bg-slate-300 bg-opacity-50" : ""}`}>
          {loading && hiddent && <div className="w-5 h-5 rounded-full border-[4px] border-white border-r-[4px] border-r-transparent animate-spin"></div>}
          {children}
        </div>
      </button>
    </>
  );
};

export default Button;
