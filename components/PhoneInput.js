import Image from "next/image";
import React, { forwardRef, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Input from "./Input";
import { COUNTRIES_LIST } from "@/constants/countries";
import { countries } from "country-flags-svg";
import ModalSelectAreaCode from "./ModalSelectAreaCode";
import { formatNumber } from "@/utils/funcs";

const PhoneInput = (
  {
    onChangePhoneCode,
    onChangePhoneNumber,
    phoneCode = "84",
    phoneNumber,
    namePhoneCode,
    namePhoneNumber,
    register,
    ...props
  },
  ref
) => {
  const refModalSelectAreaCode = useRef();
  // console.log(refModalSelectAreaCode.current);

  const onOpenSelectAreaCode = () => {
    refModalSelectAreaCode.current?.onOpen(phoneCode);
  };

  const countryCode = COUNTRIES_LIST.find(
    (countryItem) => countryItem.countryCallingCode === phoneCode
  )?.countryCode;
  const findFCountry = countries.find(
    (countryFlagItem) => countryFlagItem.iso2 === countryCode
  );
  const onChangeAreaCode = (areaItem) => {
    onChangePhoneCode(areaItem.countryCallingCode);
  };
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="my_modal_7"
          className="flex items-center justify-center  gap-2 p-2 h-[45px] w-[25%] rounded-md border-[1px] border-slate-300 cursor-pointer"
          onClick={onOpenSelectAreaCode}
        >
          <Image
            src={findFCountry?.flag}
            alt=""
            width={10}
            height={10}
            className="w-[25px] h-[25px] rounded-full object-cover"
          />
          <span className="text-[10px]">{`+${phoneCode}`}</span>
          <AiFillCaretDown className="text-xs"></AiFillCaretDown>
        </label>
        <Input
          ref={ref}
          {...props}
          placeholder="So dien thoai"
          {...register(namePhoneNumber)}
          maxLength={16}
          onChange={(e) => onChangePhoneNumber(formatNumber(e.target.value))}
        />
        <ModalSelectAreaCode
          ref={refModalSelectAreaCode}
          onChange={onChangeAreaCode}
        ></ModalSelectAreaCode>
      </div>
    </>
  );
};

export default forwardRef(PhoneInput);
