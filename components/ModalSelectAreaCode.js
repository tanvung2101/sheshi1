import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import Modal from "./Modal";
import Input from "./Input";
import { COUNTRIES_LIST } from "@/constants/countries";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

let timeout;

const ModalSelectAreaCode = ({ onChange }, ref) => {
  const [show, setShow] = useState();
  const [listCountries, setListCountries] = useState(COUNTRIES_LIST);
  const [currentPhoneCode, setCurrentPhoneCode] = useState(null);
  const [serach, setSearch] = useState("");

  const onOpen = (info) => {
    setShow(true);
    setCurrentPhoneCode(info);
  };

  const onClose = () => {
    setShow(false);
    setCurrentPhoneCode(null);
  };
  useImperativeHandle(ref, () => {
    onOpen;
  });

  const getFlag = (countryCode) => {
    if (countryCode) {
      return findFlagUrlByIso2Code(countryCode);
    }
    return "";
  };

  const onChangeArea = (area) => {
    // console.log(area);
    onChange(area);
  };

  useEffect(() => {
    const newList = COUNTRIES_LIST.filter(
      (countryItem) =>
        countryItem.countryNameEn.toLowerCase().includes(serach) ||
        countryItem.countryCallingCode.includes(serach)
    );
    setListCountries(newList);
  }, [serach]);

  const onChangeSearch = (newValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearch(newValue.toLowerCase());
    }, 500);
  };
  // console.log("search", serach);
  return (
    <>
      <Modal>
        <div className="absolute bg-white rounded-md top-24">
          <div className="relative pb-4 mt-3 px-44 border-b-[1px] border-b-gray-300">
            <h3 className="text-lg font-bold">Chon ma vung</h3>
            <label
              className="absolute top-0 right-0 -translate-x-[10px] cursor-pointer"
              htmlFor="my_modal_7"
              show={show}
            >
              <AiOutlineClose className="text-3xl text-gray-400 hover:text-black"></AiOutlineClose>
            </label>
          </div>
          <div className="px-4 mt-4 mb-8">
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => onChangeSearch(e.target.value)}
            />
          </div>
          <ul className="max-h-[300px] overflow-y-auto max-w-[500px] mb-3">
            {listCountries.map((countryItem) => (
              <li
                key={`country-${countryItem.countryCode}`}
                className={`flex items-center px-4 mt-4 `}
                onClick={() => onChangeArea(countryItem)}
              >
                <div className="w-10 h-10 mr-4">
                  {getFlag(countryItem.countryCode) && (
                    <Image
                      src={getFlag(countryItem.countryCode)}
                      alt=""
                      width={10}
                      height={10}
                      className="object-cover w-10 h-10 mr-4 rounded-full"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-normal ">{`${countryItem.countryNameEn} (${countryItem.countryNameLocal})`}</h3>
                </div>
                <div className="font-normal text-black">{`+${countryItem.countryCallingCode}`}</div>
              </li>
            ))}
            <li></li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(ModalSelectAreaCode);
