import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Sidebar = ({ menu, isShow, setIsShow }) => {
    const router = useRouter();
    const { pathname, query, asPath } = router
    console.log('gffhfhfhf', pathname)
    return (
        <div className={`fixed top-0 left-0 w-full h-[1000px] hidden bg-slate-700 bg-opacity-30 z-[99] max-lg:block transition-all duration-700 ease-in ${isShow ? '' : 'max-lg:hidden'}`}>
            <div className={`w-1/2 h-full pt-4 pl-5 z-[100] bg-white max-md:w-[65%] max-sm:w-full transition-all duration-700 ease-in ${isShow ? 'max-lg:translate-x-[0%]' : 'transition-all ease-in-out max-lg:translate-x-[-100%]'}`}>
                <div className="flex items-center justify-between mb-10 ">
                    <Link onClick={setIsShow} href='/' className="uppercase text-5xl font-normal text-regal-red cursor-pointer">sheshi</Link>
                    <span
                        onClick={setIsShow}
                        className="p-[2px] rounded-lg border-[4px] border-transparent active:border-blue-200 cursor-pointer">
                        <AiOutlineClose className="text-3xl text-gray-500 hover:text-gray-600"></AiOutlineClose>
                    </span>
                </div>
                <ul className="flex flex-col gap-5 font-semibold normal-case item-center">
                    {menu?.length > 0 &&
                        menu?.map((item) => (
                            <li key={item.id} className="cursor-pointer">
                                <Link
                                    onClick={setIsShow}
                                    className={`text-[16px] ${item.link === String(router.pathname)
                                        ? "font-bold" : 'font-medium'
                                        } `}
                                    href={`${item.link}`}
                                >
                                    {item.page}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar