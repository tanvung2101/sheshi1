import React, { forwardRef } from "react";
import Select from "react-select";

const SelectCustom = (
    { className, children, options, value, ...props },
    ref
) => {
    return (
        <Select
            {...props}
            ref={ref}
            value={options.find((itemOption) => itemOption.value === value)}
            className={("select-custom", className)}
            classNamePrefix="select-custom"
            options={options}
        />
    );
};

export default forwardRef(SelectCustom);
