import { removeItem, updateItem } from "@/redux/cartItemSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CartItemPayment = ({ item, value, index }) => {
  const dispatch = useDispatch();
  // console.log('prop.item', item)

  const [quantity, setQuantity] = useState(+item.quantity);
  const [product, setProduct] = useState(item)

  useEffect(() => {
    setProduct(item)
    setQuantity(item.quantity)
  }, [item])

  const checkQuantity = (quantityInput) => {
    if (quantityInput > product.totalQuantity) {
      setQuantity(product.totalQuantity)
      dispatch(updateItem({ ...item, quantity: product.totalQuantity }));
      toast.error(
        `Sản phẩm ${product.product.name + " " + product.capacity
        } hiện tại không đủ, chỉ còn ${product.totalQuantity} sản phẩm trong kho`,
        { position: toast.POSITION.TOP_CENTER }
      );
      return false
    }
    return true
  }
  const updateQuantity = (opt) => {
    if (opt === "+") {
      if (!checkQuantity(+quantity + 1)) return;
      if (+quantity === 999) return
      dispatch(updateItem({ ...item, quantity: quantity + 1 }));
    }
    if (opt === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 })
      );
    }
  };
  return (
    <div className="px-32 flex items-center justify-start gap-8 mt-4 max-lg:px-0">
      <div
        className={`flex items-center justify-start gap-5 relative max-h-[300px] pb-4 ${value === index + 1 ? "" : "border-b-2 border-gray-400"
          } max-lg:w-full `}
      >
        <div className="w-[180px] h-[150px]">
          <Image
            src={item?.product?.productImage[0]?.image}
            alt=""
            width="100"
            height="100"
            className="w-full h-full object-fill"
            sizes="(max-width: 768px) 50vw, 50vw"
          // fill={true}
          ></Image>
        </div>
        <div className="flex items-center justify-center gap-5 max-md:flex-col">
          <div className="w-40">
            <Link href={`/san-pham/${item.product?.slug}`} className="text-black text-2xl font-bold text-left mt-1/2 hover:text-[#ecbe26] cursor-pointer">
              {item?.product?.name + " - " + item?.capacity}
            </Link>
          </div>
          <p className="text-regal-red text-2xl font-bold text-center mt-1/2">
            {item?.price?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <div className="flex-col mb-4">
            <div className="flex justify-between text-center text-2xl font-medium ">
              <div
                className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] cursor-pointer"
                onClick={() => updateQuantity("-")}
              >
                -
              </div>
              <input
                className="w-12 h-12 bg-[#faf9f5] text-center"
                readOnly
                value={quantity}
                onChange={(e) => {
                  if (!+e.target.value) return;
                  if (!checkQuantity(+e.target.value)) return;
                  setQuantity(+e.target.value)
                  dispatch(updateItem({ ...product, quantity: +e.target.value }))
                }}
              />
              <div
                className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] cursor-pointer"
                onClick={() => updateQuantity("+")}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => dispatch(removeItem(item))}
        >
          <AiFillCloseCircle className="ml-auto text-3xl transition-all hover:text-red-600"></AiFillCloseCircle>
        </div>
      </div>
    </div>
  );
};

export default CartItemPayment;
