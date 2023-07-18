import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'


const MenuHeader = ({ menu }) => {
    const router = useRouter();
    const { pathname, query, asPath } = router
    return (
        <div className="flex flex-grow justify-end box-content mr-5 max-lg:hidden max-md:hidden">
            <ul className="font-semibold uppercase">
                {menu &&
                    menu.slice(0, 6).map((item) => (
                        <li key={item.id} className="cursor-pointer inline">
                            <Link
                                className={` ${item.link === String(router.pathname)
                                    ? "text-regal-red"
                                    : "text-[#33333e]"
                                    } text-[16px] hover:text-regal-red font-bold ml-6`}
                                href={`${item.link}`}
                            >
                                {item.page}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default MenuHeader