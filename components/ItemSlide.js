/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsBag, BsFillBagPlusFill } from "react-icons/bs";
import Portal from "./productModal";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import { IMAGE_TYPE, MASTER_DATA_NAME } from "@/constants";
import axios from "axios";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateItem } from "@/redux/cartItemSlice";
import { useRouter } from "next/router";
import useTrans from "@/page/hooks/useTrans";
import { remove } from "@/redux/productModalSlice";


async function fetchMasterCapacity(params) {
  const res = await axios.get(`http://localhost:3001/api/master`, {
    params: {
      idMaster: params,
    },
  });
  return res.data.rows;
}

const ItemSlide = ({ propProduct }) => {
  const trans = useTrans()
  const dispatch = useDispatch();
  const value = useSelector((state) => state.cartItem.value);
  // useEffect(() => {
  //   if(value.length === 0){
  //     JSON.parse(localStorage.getItem('cartItems'))
  //   }else{
  //     const data = localStorage.setItem('cartItems', JSON.stringify(value))
  //   }
  // }, [value])
  // console.log(value);
  const router = useRouter();
  // console.log(value)
  const [active, setActive] = useState(false);
  const [product, setProduct] = useState();
  const [masterCapacity, setMasterCapacity] = useState();
  const [masterUnit, setMasterUnit] = useState();
  const [price, setPrice] = useState();
  const [capacity, setCapcity] = useState();
  const [quantity, setQuantity] = useState(1);
  const [detailProduct, setDetailProduct] = useState();
  const [detailProductQuantity, setDetailProductQuantity] = useState();
  const [productDetailOption, setProductDetailOption] = useState();


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
      propProduct?.productDetail?.map((e) => {
        const capacity = masterCapacity?.find((cap) => cap.id === e.capacityId);
        const unit = masterUnit?.find((cap) => cap.id === e.unitId);
        productDetailOption.push({
          id: e.id,
          capacityId: capacity?.id,
          unitId: unit?.id,
          price: e.price,
          quantity: propProduct?.productInventory?.find(
            (q) => q.subProductId === e.id && q.productId === e.productId
          )?.quantity,
          value: capacity?.id + "-" + unit?.id,
          name: capacity?.name + " " + unit?.name,
        });
      });
    }

    setProduct({
      id: propProduct?.id,
      name: propProduct?.name,
      price: propProduct?.price,
      content: propProduct?.content,
      categorySlug: propProduct?.productCategory?.categorySlug,
      slug: propProduct?.productSlug,
      acronym: propProduct?.acronym,
      expiry: propProduct?.expiry,
      nameVi: propProduct?.nameVi,
      description: propProduct?.description,
      element: propProduct?.element,
      uses: propProduct?.uses,
      guide: propProduct?.guide,
      productCategory: propProduct?.productCategory,
      productImage: propProduct?.productImage,
      productDetail: propProduct?.productDetail,
      productInventory: propProduct?.productInventory,
      productDetailOption,

    });
    setPrice(productDetailOption[0]?.price);
    setCapcity(
      productDetailOption[0]?.capacityId + "-" + productDetailOption[0]?.unitId
    );
    setDetailProduct(productDetailOption[0]?.quantity);
    setDetailProductQuantity(productDetailOption[0]?.quantity);
    setProductDetailOption(productDetailOption)
  }, [
    masterCapacity,
    masterUnit,
    propProduct,
  ]);

  const updateQuantity = (type) => {
    if (type === "plus") {
      if (+quantity === 999) return;
      setQuantity(+quantity + 1);
    } else {
      setQuantity(+quantity - 1 < 1 ? 1 : +quantity - 1);
    }
  };
  const addCartItem = () => {
    if (+quantity < 1) return false;
    let newItem = {
      slug: product.slug,
      product: product,
      capacityId: productDetailOption[0]?.capacityId,
      unitId: productDetailOption[0]?.unitId,
      price: productDetailOption[0]?.price,
      quantity: quantity,
      capacity: productDetailOption[0]?.name,
      totalQuantity: detailProductQuantity,
    };
    if (+quantity > detailProductQuantity) {
      setQuantity(detailProductQuantity);
      return toast.error(
        `Sản phẩm hiện tại không đủ, chỉ còn ${detailProductQuantity} trong kho`
      );
    }
    const item = value.find(
      (e) =>
        e.slug === newItem.slug &&
        e.capacityId === newItem.capacityId &&
        e.unitId === newItem.unitId
    );
    if (item) {
      if (item.quantity + quantity > detailProductQuantity) {
        return toast.error(
          `Sản phẩm hiện tại không đủ, chỉ còn ${detailProductQuantity} trong kho`
        );
      }
    }
    dispatch(addItem(newItem));
    toast.success("Sản phẩm đã thêm vào vỏ hàng");
  };
  const goToCart = () => {
    if (+quantity < 1) return false;
    let newItem = {
      slug: product.slug,
      product: product,
      capacityId: productDetailOption[0]?.capacityId,
      unitId: productDetailOption[0]?.unitId,
      price: productDetailOption[0]?.price,
      quantity: quantity,
      capacity: productDetailOption[0]?.name,
      totalQuantity: detailProductQuantity,
    };
    if (+quantity > detailProductQuantity) {
      setQuantity(detailProductQuantity);
      return toast.error(
        `Sản phẩm hiện tại không đủ, chỉ còn ${detailProductQuantity} trong kho`
      );
    }
    const item = value.find(
      (e) =>
        e.slug === newItem.slug &&
        e.capacityId === newItem.capacityId &&
        e.unitId === newItem.unitId
    );
    if (item) {
      if (+item.quantity + +quantity > detailProductQuantity) {
        return toast.error(
          `Sản phẩm hiện tại không đủ, chỉ còn ${detailProductQuantity} trong kho`
        );
      }
    }
    dispatch(addItem(newItem))
    dispatch(remove())
    router.push('/cart')
    toast.success("Sản phẩm đã thêm vào vỏ hàng");

  };
  const renderContent = (
    <div
      className={`${active ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full overflow-auto z-[101] pt-24 bg-black bg-opacity-30 opacity-1 visible`}
    >
      <div
        className={`w-[900px] m-auto box-border bg-white p-8 transition-all ${active ? "" : "translate-y-0 transition-all"
          } relative flex justify-between max-md:flex-col max-md:w-full`}
      >
        <span
          className={`absolute top-2 right-2 text-4xl hover:text-red-500 cursor-pointer`}
          onClick={() => {
            document.body.style = "overflow: scroll"
            setActive(false)
          }}
        >
          <AiOutlineClose className="text-slate-500" />
        </span>
        <div className="w-[50%] max-md:w-full">
          <div className="box-border w-full">
            <Image
              src={product?.productImage[0]?.image}
              alt=""
              width={200}
              height={250}
              className="w-full max-h-[350px] object-cover"
            ></Image>
          </div>
        </div>
        <div className="flex-col w-[45%] max-md:w-full max-md:mt-2">
          <div className="max-md:flex max-md:flex-col max-md:items-center">
            <h4>{product?.name}</h4>
            <span className="block mt-4 font-sans text-3xl font-bold text-regal-red">
              {price?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <div className="flex flex-col mt-4 max-md:items-center max-sm:w-full">
              <p className="font-sans text-xl font-semibold max-md:text-center max-md:mb-6">
                Số lượng
              </p>
              <div className="flex text-2xl font-medium text-center max-md:justify-center">
                <div
                  className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] cursor-pointer"
                  onClick={() => updateQuantity()}
                >
                  -
                </div>
                <input
                  className="w-12 h-12 bg-[#faf9f5] text-center"
                  value={quantity}
                  onChange={(e) => {
                    if (!+e.target.value) return 1;
                    setQuantity(+e.target.value);
                  }}
                />
                <div
                  className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] cursor-pointer"
                  onClick={() => updateQuantity("plus")}
                >
                  +
                </div>
              </div>
              <div className="text-lg text-white uppercase mt-7 ">
                <div
                  className="flex gap-2 w-full"
                  onClick={(e) => {
                    if (!e.target.htmlFor) return
                    setDetailProductQuantity(product.productDetailOption.find(
                      (prDetail) => prDetail.value === e.target.htmlFor
                    ).quantity);
                    setPrice(product.productDetailOption.find(
                      (prDetail) => prDetail.value === e.target.htmlFor
                    ).price);
                    setCapcity(e.target.htmlFor)
                  }}>
                  {product && product.productDetailOption?.map((optionCapcity) => {
                    return (
                      <div key={optionCapcity.value} className="">
                        <input
                          type="radio"
                          id={optionCapcity.id}
                          value={optionCapcity.value}
                          name="capcity"
                          checked={capacity === optionCapcity.value}
                          className="hidden"
                          readOnly
                        />
                        <label
                          className={`inline-block text-center text-base border-[1px] border-red-600 rounded-md py-1 px-2 cursor-pointer ${capacity === optionCapcity.value ? 'bg-red-600 text-white' : 'text-red-600'}`}
                          htmlFor={optionCapcity.value}>
                          {optionCapcity.name}
                        </label>
                      </div>
                    )
                  })}
                </div>
                {/* {productDetailOption.map((e, index) => {
                  return (
                    <span key={index} className="bg-[#dc3545] p-3 rounded-lg">
                      {e?.name}
                    </span>
                  )
                })} */}
              </div>
              <div className="flex items-start gap-5 mt-5 text-center max-sm:flex-col max-sm:w-full">
                <div className="max-sm:w-full">
                  <div
                    onClick={() => addCartItem()}
                    className="px-3 py-2 uppercase border border-regal-red rounded-lg text-[#bc2029] font-bold flex items-center justify-center gap-1 hover:bg-regal-red hover:text-white transition-all cursor-pointer max-sm:w-ful"
                  >
                    <BsBag></BsBag>
                    Thêm vào giỏ
                  </div>
                </div>
                <div className="max-sm:w-full">
                  <Button
                    type="submit"
                    onClick={() => goToCart()}
                    className="w-full h-full uppercase font-bold"
                  >
                    {/* <Link href={"/cart"}>mua ngay</Link> */} Mua ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="relative flex-col items-center justify-center p-5 mx-auto overflow-hidden hover:text-regal-red group max-[576px]:w-full max-[576px]:px-1">
        <div className="w-full mb-2">
          <Link href={`/san-pham/${product?.slug}`}>
            {product?.productImage && (
              <Image
                src={product?.productImage[0]?.image}
                alt=""
                width={200}
                height={200}
                className="w-full max-h-[300px] object-cover hover:scale-95 transition duration-150 ease-in-out max-md:max-h-[180px]"
              />
            )}
          </Link>
        </div>
        <div
          onClick={() => {
            document.body.style = "overflow: hidden"
            setActive(true)
          }}
          className="w-[45px] h-[45px] mx-auto border bg-regal-red rounded-full flex items-center justify-center opacity-0
        group-hover:opacity-100 active:border-black active:bg-light-pink cursor-pointer"
        >
          <BsFillBagPlusFill className="w-5 h-5 text-white active:text-black"></BsFillBagPlusFill>
        </div>
        <div className="flex-col items-center justify-center mt-6">
          <span className="block text-[20px] font-bold text-center text-span">
            <Link href={`/san-pham/${product?.slug}`}>{product?.name}</Link>
          </span>
          <span className="block text-[20px] text-regal-red font-bold text-center">
            {price &&
              price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
          </span>
        </div>
        {active &&
          createPortal(renderContent, document.getElementById("__next"))}
      </div>
    </>
  );
};

export default ItemSlide;
