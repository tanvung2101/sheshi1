import React from 'react'
import Image from "next/image";
import Link from "next/link";

const OrderDetailsRow = ({ order, product }) => {
    return (
        <>
            <div className="mt-10 w-full border-b-[1px] border-b-gray-300">
                <div className="flex w-full">
                    <div className="flex flex-col w-[15%] max-md:hidden">
                        <div className="bg-[#fdf2ec] pt-2 pb-4 px-2 w-full">
                            <p className="uppercase text-[15px] font-normal">Hình</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-[40%] max-md:w-[85%]">
                        <div className="bg-[#fdf2ec] pt-2 pb-4 w-full max-md:pl-4">
                            <p className="uppercase text-[15px] font-normal">sản phẩm</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-[5%] max-md:w-[15%]">
                        <div className="bg-[#fdf2ec] pt-2 pb-4 pr-2 w-full">
                            <p className="uppercase text-[15px] font-normal">sl</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-[25%] max-md:hidden">
                        <div className="bg-[#fdf2ec] pt-2 pb-4 pr-2 w-full">
                            <p className="uppercase text-[15px] font-normal text-center">
                                giá
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-[15%] max-md:hidden">
                        <div className="bg-[#fdf2ec] pt-2 pr-2 pb-4">
                            <p className="uppercase text-[15px] font-normal float-right">
                                tạm tính
                            </p>
                        </div>
                    </div>
                </div>
                {order &&
                    order.orderItem?.map((item, index) => (
                        <div
                            key={index}
                            className="flex w-full pb-2"
                        >
                            <div className="flex flex-col w-[15%] max-md:hidden">
                                <div className="px-2 mt-3">
                                    <Image
                                        src={item?.product.productImage[0]?.image}
                                        alt=""
                                        width={80}
                                        height={50}
                                        className="w-[60px] h-[50px] object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-[40%] max-md:w-[85%]">
                                <div className="flex flex-col mt-3 max-md:pl-4">
                                    <p className="text-lg text-regal-red hover:text-[#ecbe26]">
                                        <Link href={`/san-pham/${item?.product.productSlug}`}>
                                            {item?.product.name}
                                        </Link>
                                    </p>
                                    <p className="text-lg">
                                        Kích cỡ:{" "}
                                        {
                                            product?.find(
                                                (e) =>
                                                    e.id === item.subProductId &&
                                                    e.productId &&
                                                    item.productId
                                            )?.name
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-[5%]">
                                <div className="flex flex-col mt-3">
                                    <span className="text-lg">
                                        {order &&
                                            order.orderItem[0]?.quantity}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-[25%] max-md:hidden">
                                <div className="flex flex-col mt-3">
                                    <p className="text-lg text-center">
                                        {item?.price?.toLocaleString("vi", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-[15%] max-md:hidden">
                                <div className="flex flex-col px-2 mt-3 ">
                                    <p className="text-lg text-right">
                                        {item?.price?.toLocaleString("vi", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                    ))}
            </div>
            <div className="w-full mt-2">
                <div className="flex flex-col w-[33%] float-right max-md:w-[65%] max-sm:w-[90%]">
                    <div className="flex items-center justify-between w-full pr-2">
                        <span className="text-lg font-normal text-right text-black">
                            Tạm tính
                        </span>
                        <span className="text-lg font-normal text-black">
                            {!!order && order?.totalBeforeFee?.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </span>
                    </div>
                    {!!order.length !== 0 && order?.commission && (<div className="flex items-center justify-between w-full pr-2 mt-5">
                        <span className="text-lg font-normal text-black">
                            Hoa hồng cấp đại lý
                        </span>
                        <span className="text-lg font-normal text-black">
                            {(order?.commission).toLocaleString(
                                "vi",
                                { style: "currency", currency: "VND" }
                            )}
                        </span>
                    </div>)}
                    {!!order.length !== 0 && order?.shipId && (<div className="flex items-center justify-between w-full pr-2 mt-5">
                        <span className="text-lg font-normal text-black">
                            Phí vận chuyển
                        </span>
                        <span className="text-lg font-normal text-black">
                            {(order?.total - order?.totalBeforeFee + (order?.commission ? order?.commission : 0)).toLocaleString(
                                "vi",
                                { style: "currency", currency: "VND" }
                            )}
                        </span>
                    </div>)}
                    <div className="flex items-center justify-between w-full pr-2 mt-5">
                        <span className="text-lg font-medium text-regal-red">
                            Thành tiền
                        </span>
                        <span className="text-lg font-medium no-underline text-regal-red">
                            {order?.total?.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetailsRow