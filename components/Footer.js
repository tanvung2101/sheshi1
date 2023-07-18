import Image from "next/image";
import React, { useEffect, useState } from "react";
import logosheshe from "../public/logosheshe.png";
import useSWR from "swr";
import { CONTACT_PAGE } from "@/constants";
import Link from "next/link";
import { BsCart, BsCollection, BsHouse, BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = () => {
  const { value } = useSelector(state => state.cartItem)
  const [contact, setContact] = useState();
  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/api/config-page/contact",
    fetcher
  );
  useEffect(() => {
    setContact(data?.find((ct) => ct.type === CONTACT_PAGE.ADDRESS_FOOTER));
  }, [data]);

  return (
    <>
      <div className="relative bottom-0 left-0 right-0 pb-9">
        <div className="z-0 pt-10 pb-10 text-white bg-regal-red">
          <div className="flex items-start justify-around max-lg:flex-col max-lg:items-center max-sm:flex-col max-sm:items-center">
            <div className="flex items-center justify-between gap-20 max-lg:flex-col max-lg:gap-4 max-sm:flex-col max-sm:gap-4">
              <Link href={{
                pathname: '/',
              }}>
                <Image
                  src={`${logosheshe.src}`}
                  alt=""
                  width={140}
                  height={120}
                  className="cursor-pointer"
                ></Image>
              </Link>
              <div className="max-lg:text-center max-sm:text-center">
                <strong className="text-xl text-white uppercase">
                  công ty cổ phần tập đoàn shishe
                </strong>
                <p className="mb-5 font-medium uppercase">
                  số gpkd: {contact?.businessLicense}
                </p>
                <p className="mb-5 font-medium">Địa chỉ: {contact?.address}</p>
                <p className="mb-5 font-medium">
                  Điện thoại: {contact?.telephone}
                </p>
                <p>Email: {contact?.email}</p>
              </div>
            </div>
            <div className="flex-col items-center max-lg:mt-10 max-lg:mb-10 max-sm:mt-10 max-sm:mb-10">
              <span className="mb-5 block uppercase font-bold text-[#fefcfc] hover:text-yellow-300">
                <Link href="/huong-dan-mua-hang">hướng dẫn mua hàng</Link>
              </span>
              <span className="mb-5 block uppercase font-bold text-[#fefcfc] hover:text-yellow-300">
                <Link href="/chinh-sach-doi-tra">chính sách đổi trả</Link>
              </span>
              <span className="mb-5 block uppercase font-bold text-[#fefcfc] hover:text-yellow-300">
                <Link href="/chinh-sach-giao-hang">chính sách giao hàng</Link>
              </span>
              <span className="block uppercase font-bold text-[#fefcfc] hover:text-yellow-300">
                <Link href="/chinh-sach-bao-mat">chính sách bảo mật</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden max-lg:inline-block">
        <div className="fixed bottom-0 right-0 left-0 z-[100] bg-[#f8f9fa] shadow-md">
          <ul className="flex items-center justify-around py-2">
            <li>
              <Link href='/'>
                <div className="flex flex-col items-center gap-2 justify-center text-xs">
                  <BsHouse className="text-xl"></BsHouse>
                  Trang chủ
                </div>
              </Link>
            </li>
            <li>
              <Link href='/san-pham'>
                <div className="flex flex-col items-center gap-2 justify-center text-xs">
                  <BsCollection className="text-xl"></BsCollection>
                  Sản phẩm
                </div>
              </Link>
            </li>
            <li>
              <Link href='/cart'>
                <div className="flex flex-col items-center gap-2 justify-center text-xs">
                  <div className="relative">
                    <BsCart className="text-xl"></BsCart>
                    <div className="absolute top-0 left-0 translate-x-[80%] -translate-y-1/2 w-4 h-4 rounded-full bg-red-600 text-center text-[8px] text-white">{value?.length}</div>
                  </div>
                  Giỏ hàng
                </div>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <div className="flex flex-col items-center gap-2 justify-center text-xs">
                  <BsPerson className="text-xl"></BsPerson>
                  Tài khoản
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
