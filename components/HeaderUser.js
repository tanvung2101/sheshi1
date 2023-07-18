import Image from "next/image";
import React, { useRef, useState } from "react";
import img from "../public/logo_text.svg";
import logosheshe from "../public/logosheshe.png";
import "tippy.js/dist/tippy.css";
import CartIcon from "./CartIcon";
import Span from "./Span";
import userPlus from "../public/user-plus.svg";
import { Vehicle } from "@/components";
import signin from "../public/signin.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logoIcon from "../public/logosheshe.png";
import {
  BsBoxArrowRight,
  BsPersonBoundingBox,
  BsReceipt,
  BsSearch,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/accountSlice";
import { deleteAll } from "@/redux/cartItemSlice";
import MenuNavbar from "./MenuNavbar";
import Sidebar from "./Sidebar";
import MenuHeader from "./Menu";


const menu = [
  {
    id: 1,
    page: "Trang chủ",
    link: "/",
  },
  {
    id: 2,
    page: "Giới thiệu",
    link: "/gioi-thieu",
  },
  {
    id: 3,
    page: "Sản phẩm",
    link: "/san-pham",
  },
  {
    id: 4,
    page: "Học viện shishe",
    link: "/hoc-vien-dao-tao-sheshi",
  },
  {
    id: 5,
    page: "Tin tức",
    link: "/tin-tuc",
  },
  {
    id: 6,
    page: "Liên hệ",
    link: "/lien-he",
  },
  {
    id: 7,
    page: "Giỏ hàng",
    link: "/cart",
  },
  {
    id: 8,
    page: "Đăng nhập",
    link: "/login",
  },
  {
    id: 9,
    page: "Đăng kí",
    link: "/sign-up",
  },
];

const HeaderUser = ({ pathname }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, info } = useSelector((state) => state.account);

  const [isShow, setIsShow] = useState(false);

  // console.log(router);
  const [keyWord, setKeyWord] = useState();
  const emailOrderRef = useRef();
  const orderCodeOrderRef = useRef();

  const handler = (e) => {
    if (e.target.value === undefined) {
      setKeyWord();
      return;
    } else {
      setKeyWord(e.target.value.replace(/[.*+?^${}()|[\]\\]/g, " "));
    }
  };
  const handlerSerachOrder = (e) => {
    e.preventDefault();
    // console.log(emailOrderRef.current.value);
    const emailOrder = emailOrderRef.current.value;
    const orderCodeOrder = orderCodeOrderRef.current.value;

    router.replace(
      `/search-order?email=${emailOrder}&orderCode=${orderCodeOrder}`
    );
    emailOrderRef.current.value = "";

  };
  const { value } = useSelector((state) => state.cartItem);

  const onLogoutAction = () => {
    dispatch(deleteAll());
    dispatch(logout())
    router.replace("/");
  };

  const onGetAvatar = () => {
    let avatar = "";
    avatar = info?.userInformation?.avatar;

    if (avatar) {
      return avatar;
    }

    return logoIcon.src;
  };

  // console.log(window.pageYOffset)
  return (
    <>
      {/* <LocaleSwitcher /> */}
      <div className="w-full header flex items-center justify-evenly py-6 bg-[#ffffff] max-lg:justify-between">
        <div className="flex items-center justify-evenly h-full mr-4 max-lg:w-full max-lg:justify-between max-lg:gap-x-3 max-lg:px-6 max-md:px-5 max-sm:px-3">
          <div className="flex items-start max-lg:items-center max-sm:justify-center">
            <MenuNavbar setShow={() => setIsShow(true)}></MenuNavbar>
            <Link href='/' className="flex items-center gap-2 max-w-[150px] max-sm:w-[100px]">
              <div className="w-14 h-14 max-md:w-7 max-md:h-7">
                <Image
                  src={`${logosheshe.src}`}
                  alt="logo"
                  width={30}
                  height={30}
                  className="cursor-pointer w-full h-full"
                ></Image>
              </div>
              <div className="w-32 h-11 max-md:w-16 max-md:h-7">
                <Image
                  src={`${img.src}`}
                  alt="logo"
                  width={60}
                  height={30}
                  className="cursor-pointer w-full h-full"
                ></Image>
              </div>
            </Link>
            <Sidebar menu={menu} setIsShow={() => setIsShow(false)} isShow={isShow}></Sidebar>
          </div>
          <MenuHeader menu={menu}></MenuHeader>
          <div className="flex items-center justify-evenly">
            {/* tìm kiếm sản phẩm*/}
            <div className="dropdown dropdown-end searchIcon mr-5">
              <span tabIndex={0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
              <div
                tabIndex={0}
                className="shadow dropdown-content bg-base-100 rounded-box"
              >
                <CartIcon>
                  <Span>Tìm kiếm sản phẩm</Span>
                  <label className="relative">
                    <input
                      className={`w-full p-2 rounded-lg outline-none bg-[#f8f9fa] border border-[#edeff1] inline-block focus:ring-4 focus:ring-blue-200 `}
                      onChange={handler}
                      placeholder="Nhập từ khóa cần kiếm"
                    ></input>
                    <Link
                      href={`/search?keyword=${keyWord || ''}`}
                      className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2"
                    >
                      <BsSearch />
                    </Link>
                  </label>
                </CartIcon>
              </div>
            </div>


            {/* tìm kiếm đơn hàng */}
            <div className="dropdown dropdown-end eysIcon mr-5">
              <span tabIndex={0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <div
                tabIndex={0}
                className="shadow dropdown-content menu bg-base-100 rounded-box "
              >
                <form className="block" onSubmit={handlerSerachOrder}>
                  <CartIcon>
                    <Span>Tìm kiếm đơn hàng</Span>
                    <input
                      ref={emailOrderRef}
                      type="text"
                      placeholder="Nhập email"
                      className={`w-full p-2 rounded-lg outline-none bg-[#f8f9fa] border border-[#edeff1] inline-block focus:ring-4 focus:ring-blue-200 `}
                    ></input>
                    <input
                      ref={orderCodeOrderRef}
                      type="text"
                      placeholder="Nhập mã đơn hàng"
                      className={`my-4 w-full p-2 rounded-lg outline-none bg-[#f8f9fa] border border-[#edeff1] inline-block focus:ring-4 focus:ring-blue-200 `}
                    ></input>
                    <button className="p-2 px-20 rounded-lg outline-none bg-[#f8f9fa] border border-[#edeff1] text-sm hover:bg-slate-300">
                      Submit
                    </button>
                  </CartIcon>
                </form>
              </div>
            </div>
            {/* giỏ hàng */}
            <div className="relative dropdown dropdown-end bagIcon mr-5">
              <Link href="/cart">
                <span tabIndex={0}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </span>
                <span className="w-[15px] h-4 text-[9px] text-white text-center rounded-full bg-red-500 absolute top-1/2 left-1/2 translate-x-[30%] -translate-y-2/3">
                  {value?.length || 0}
                </span>
              </Link>
            </div>
            {token ? (
              <>
                {/* profile */}
                <div className="relative flex items-center justify-between dropdown dropdown-end">
                  <div tabIndex={0} className="cursor-pointer">
                    <Image
                      src={onGetAvatar()}
                      alt=""
                      width={30}
                      height={30}
                      className="object-cover w-[30px] h-[30px] rounded-full"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content absolute z-[99] right-0 flex flex-col items-start justify-center top-full min-w-[250px] px-3 py-4 bg-[#f6f6f6] rounded-md shadow-md"
                  >
                    <li className="w-full h-full px-3 py-3 rounded-md hover:bg-[#fdf2ec]">
                      <Link href="/profile" className="flex items-center gap-4">
                        <span>
                          <BsPersonBoundingBox></BsPersonBoundingBox>
                        </span>
                        <p className={`text-[15px] ${pathname === '/profile' ? 'font-medium' : 'font-normal'}`}>Trang cá nhân</p>
                      </Link>
                    </li>
                    <li className="w-full h-full px-3 py-3 rounded-md hover:bg-[#fdf2ec]">
                      <Link href="/my-order" className="flex items-center gap-4">
                        <span>
                          <BsReceipt></BsReceipt>
                        </span>
                        <p className={`text-[15px] ${pathname === '/my-order' ? 'font-medium' : 'font-normal'}`}>
                          Đơn hàng của tôi
                        </p>
                      </Link>
                    </li>
                    <li
                      onClick={() => onLogoutAction()}
                      className="w-full h-full px-3 py-3 rounded-md hover:bg-[#fdf2ec]"
                    >
                      <div className="flex items-center gap-4 cursor-pointer">
                        <span>
                          <BsBoxArrowRight></BsBoxArrowRight>
                        </span>
                        <p className="text-[15px] font-normal">Đăng xuất</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {/* signin - register */}
                <div className="dropdown dropdown-end personIcon">
                  <span tabIndex={0}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </span>
                  <div
                    tabIndex={0}
                    className="shadow dropdown-content menu bg-base-100 rounded-box "
                  >
                    <CartIcon className="w-[250px]">
                      <Link href="/login">
                        <Span className="flex items-center gap-2 p-3 text-sm rounded-md hover:bg-[#fef9f2]">
                          <Image
                            src={`${signin.src}`}
                            alt=""
                            width={22}
                            height={22}
                            className="w-4 h-4"
                          ></Image>
                          Đăng nhập
                        </Span>
                      </Link>
                      <Link href="/sign-up">
                        <Span className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-[#fef9f2]">
                          <Image
                            src={`${userPlus.src}`}
                            alt=""
                            width={22}
                            height={22}
                          ></Image>
                          Đăng kí
                        </Span>
                      </Link>
                    </CartIcon>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Vehicle></Vehicle>
    </>
  );
};

export default HeaderUser;
