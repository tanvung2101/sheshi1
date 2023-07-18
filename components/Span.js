import React from "react";

const Span = ({className, children}) => {
  return (
    <>
      <span className={`mb-2 ${className}`}>
        {children}
      </span>
    </>
  );
};

export default Span;
