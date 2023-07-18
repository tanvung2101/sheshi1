import React, { useRef, useState } from "react";

const CheckBox = (props) => {
  const inputRef = useRef(null);
  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
      // console.log(inputRef.current.checked);
    }
  };
  return (
    <label className="flex items-center gap-3 group">
      <span
        className={`${inputRef.current?.checked === true ? "bg-regal-red" : ""
          } block w-4 h-4 border border-slate-300`}
      ></span>
      <input
        type="checkbox"
        ref={inputRef}
        onChange={onChange}
        checked={props.checked}
        className="hidden outline-2"
      />
      {props.label}
    </label>
  );
};

export default CheckBox;
