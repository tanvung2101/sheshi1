import React, { useEffect, useState } from "react";
import { SEO } from "@/components";
import Link from "next/link";
import { useSelector } from "react-redux";
import CartTabs from "@/components/CartTabs";
import CartEmpty from "@/components/CartEmpty";
import CartItemPayment from "@/components/cartItemPayment";
// import dynamic from 'next/dynamic'
// const CartEmpty = dynamic(() => import('../../components/CartEmpty'), { ssr: false, })
// const CartItemPayment = dynamic(() => import('../../components/cartItemPayment'), { ssr: false, })
// const CartTabs = dynamic(() => import('../../components/CartTabs'), { ssr: false, })
// const SEO = dynamic(() => import('../../components/SEO/index'), { ssr: false, })

const Cart = () => {
  const { value } = useSelector((state) => state.cartItem);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      value?.reduce((total, currentValue) => {
        return total + Number(currentValue.price * currentValue.quantity);
      }, 0)
    );
  }, [totalPrice, value]);
  return (
    <>
      <SEO title="Giỏ hàng"></SEO>
      {value?.length === 0 && (
        <CartEmpty></CartEmpty>
      )}
      {value?.length > 0 && (
        <>
          <CartTabs tabs={1} />
          <div className="flex mb-10 max-lg:flex-col max-lg:px-12 max-md:px-4">
            <div>
              {value?.map((item, index) => {
                return (
                  <CartItemPayment key={item.id} item={item} value={value.length || 0} index={index} />
                );
              })}
            </div>
            <div className="">
              <div className="p-4 flex flex-col gap-5 shadow-md max-h-[300px]">
                <p className="text-2xl font-sans font-normal">
                  Bạn đang có sản phẩm trong giỏ hàng
                </p>
                <div className="flex items-start justify-between">
                  <span className="text-xl font-sans font-normal">
                    Thành Tiền:
                  </span>
                  <span className="text-2xl text-regal-red font-sans font-bold">
                    {totalPrice?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-5 px-2 max-lg:flex-col">
                  <button className="py-2 px-3 rounded-md bg-white text-regal-red border border-regal-red text-base font-light font-serif hover:bg-regal-red transition-all hover:text-white max-lg:w-full">
                    <Link href="/san-pham">Tiếp tục mua hàng</Link>
                  </button>
                  <button className="py-2 px-3 rounded-md bg-regal-red text-white text-base font-light font-serif max-lg:w-full">
                    <Link href="/payment-confirm">Đặt hàng</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// export async function getStaticProps() {
//   const { data } = await axios.get("http://0.0.0.0:3001/api/product/");
//   return {
//     props: { data: data.rows },
//   };
// }

export default Cart;
