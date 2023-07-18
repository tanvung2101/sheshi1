import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MASTER_DATA_NAME } from "@/constants";
import axios from "axios";
import Button from "./Button";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

async function fetchMasterCapacity(params) {
  const res = await axios.get(`http://localhost:3001/api/master`, {
    params: {
      idMaster: params,
    },
  });
  return res.data.rows;
}

const Portal = ({ClassName = '',productInventory, productDetail}) => {
  console.log('productInventory', productInventory)
  const [active, setActive] = useState(false);
  const [masterCapacity, setMasterCapacity] = useState();
  const [masterUnit, setMasterUnit] = useState();
  const [quantity, setQuantity] = useState();


  const fetchMasterData = async () => {
    const DataMasterCapacity = await fetchMasterCapacity(
      MASTER_DATA_NAME.CAPACITY_PRODUCT
    );
    const DataMasterUnit = await fetchMasterCapacity(
      MASTER_DATA_NAME.UNIT_PRODUCT
    );
    setMasterCapacity(DataMasterCapacity);
    setMasterUnit(DataMasterUnit);
  };
  useEffect(() => {
    fetchMasterData();
  }, []);
  useEffect(() => {
    const productDetailOption = [];
    if (masterCapacity?.length > 0) {
      productDetail?.map((e) => {
        // console.log("e", e);
        const capacity = masterCapacity?.find((cap) => cap.id === e.capacityId);
        // console.log(capacity);
        const unit = masterUnit?.find((cap) => cap.id === e.unitId);
        productDetailOption.push({
          capacityId: capacity?.id,
          unitId: unit?.id,
          price: e.price,
          quantity: productInventory?.find(
            (q) => q.subProductId === e.id && q.productId === e.productId
          )?.quantity,
          value: capacity?.id + "-" + unit?.id,
          name: capacity?.name + " " + unit?.name,
        });
      });
    }
    console.log("productDetailOption", productDetailOption);
  }, [masterCapacity, masterUnit, productDetail, productDetail.productDetail, productInventory]);

  const renderContent = (
    <div
      onClick={() => setActive(false)}
      className={`${ClassName} ${
        active ? "hidden" : ""
      } w-full h-full fixed top-0 left-1/2 -translate-x-1/2 flex items-center justify-center overflow-hidden bg-black bg-opacity-30`}
    >
      <div
        className={`box-border flex items-center justify-center gap-6 bg-white p-8 relative transition-all -translate-y-2/3 ${
          active ? "" : "translate-y-0 transition-all"
        }`}
      >
        <span
          onClick={onClick}
          className={`absolute top-2 right-2 text-4xl hover:text-red-500 cursor-pointer`}
        >
          <AiOutlineClose className="text-slate-500" />
        </span>
        <div className="w-full h-full">
          <div className="w-full h-full box-border">
            <Image
              src={image}
              alt=""
              width={400}
              height={450}
              className="w-full max-h-[350px] object-cover"
            ></Image>
          </div>
        </div>
        <div className="flex-col w-full h-full">
          <div>
            <h4>{name}</h4>
            <span className="block mt-4 text-3xl font-bold text-regal-red font-sans">
              {price?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <div className="flex-col mt-4">
              <span className="text-xl font-semibold font-sans inline-block">
                Số lượng
              </span>
              <div className="flex text-center text-2xl font-medium ">
                <div className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] cursor-pointer">
                  -
                </div>
                <input
                  type="text"
                  className="w-12 h-12 bg-[#faf9f5] text-center"
                  value={qty || 0}
                  readOnly
                />
                <div className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] cursor-pointer">
                  +
                </div>
              </div>
              <div className="uppercase mt-7 text-lg text-white ">
                <span className="bg-[#dc3545] p-3 rounded-lg">{capacity}</span>
              </div>
              <div className="flex items-start gap-5 mt-5 text-center">
                <Button className="py-3 px-6 uppercase border border-regal-red rounded-lg text-[#bc2029] font-bold hover:bg-regal-red hover:text-white transition-all">
                  Thêm vào giỏ
                </Button>
                <Button className="py-3 px-8 uppercase bg-regal-red rounded-lg text-white font-bold">
                  <Link href={"/cart"}>mua ngay</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return createPortal(renderContent, document.getElementById("__next"));
};

export default Portal;
