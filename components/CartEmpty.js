import Link from 'next/link'
import React from 'react'
import { BsFillInboxFill } from 'react-icons/bs'

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-24">
      <div>
        <BsFillInboxFill className="text-[150px]"></BsFillInboxFill>
      </div>
      <p className="text-lg text-slate-600 font-sans max-lg:text-center">
        Chưa có sản phẩm nào trong giỏ hàng.
      </p>
      <Link href="/san-pham">
        <button className="block mt-8 px-4 pt-1 pb-2 text-white rounded-md text-base bg-[#bc2029]">
          Quay trở lại cửa hàng
        </button>
      </Link>
    </div>
  )
}

export default CartEmpty