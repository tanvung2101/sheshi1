import React, { forwardRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFiles } from "react-icons/bs";
import { toast } from "react-toastify";

let timeout;

const InputCopy = ({ className, ...props }, ref) => {
  const [dis, setDis] = useState(false);

  const onCopyClipboard = () => {
    toast.success("Sao chep thanh cong");
    setDis(true);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setDis(false);
    }, 5000);
  };
  const copy = (e) => {
    const arr = window.location.href.split("/");
    const url = arr[0] + "//" + arr[2];
    navigator.clipboard.writeText(`${url}/sign-up/${e}`);
  };
  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        className={`${className} inline-block w-full py-3 pl-4 pr-10 bg-slate-200 rounded-md outline-none text-sm border border-slate-300 cursor-default`}
      />
      <CopyToClipboard text={props.value} onCopy={copy}>
        <button
          className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2"
          onClick={onCopyClipboard}
          disabled={dis}
        >
          <BsFiles></BsFiles>
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default forwardRef(InputCopy);
