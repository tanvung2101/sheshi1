import dynamic from 'next/dynamic'
const ItemSlide = dynamic(() => import('../../components/ItemSlide'), { ssr: false })
const SEO = dynamic(() => import('../../components/SEO/index'), { ssr: false })
import { GLOBAL_STATUS } from "@/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { MASTER_DATA_NAME } from "@/constants";
import { toast } from "react-toastify";
import { addItem } from "@/redux/cartItemSlice";
import productsApis from "@/apis/productApis";

const introduce = [
  {
    id: 1,
    title: "Mô tả sản phẩm ",
  },
  {
    id: 2,
    title: "Thành phần",
  },
  {
    id: 3,
    title: "Công dụng",
  },
  {
    id: 4,
    title: "Hướng dẫn sử dụng",
  },
];

async function fetchMasterCapacity(params) {
  const res = await axios.get(`http://localhost:3001/api/master`, {
    params: {
      idMaster: params,
    },
  });
  return res.data.rows;
}

const Item = ({ productDetail }) => {
  // console.log("productDetail", productDetail)
  // const [productItem, itemSlug] = productDetail;

  const [productIt, setProductIt] = useState();
  console.log("itemSlug", productIt);
  const { value } = useSelector((state) => state.cartItem);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const router = useRouter();
  const [product, setProduct] = useState();
  const [masterCapacity, setMasterCapacity] = useState();
  const [masterUnit, setMasterUnit] = useState();
  const [price, setPrice] = useState();
  const [capacity, setCapcity] = useState();
  const [quantity, setQuantity] = useState(1);
  const [detailProductQuantity, setDetailProductQuantity] = useState();
  const [productDetailOption, setProductDetailOption] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  console.log('kjlhkjhkhkjh', query)


  const [hidden, setHidden] = useState(1);
  const getProductSlug = useCallback(async () => {
    if (!query.slug) return setProductIt()
    const params = {
      productSlug: query.slug,
    }
    const product = await productsApis.getProductsClient(params)
    setProductIt(product)
    console.log('productproduct', product)
  }, [query.slug])
  useEffect(() => {
    getProductSlug()
  }, [getProductSlug])
  // useEffect(() => {
  //   setProductIt(productDetail);
  // }, [productDetail]);
  const updateQuantity = (type) => {
    if (type === "plus") {
      if (+quantity === 999) return;
      setQuantity(+quantity + 1);
    } else {
      setQuantity(+quantity - 1 < 1 ? 1 : +quantity - 1);
    }
  };
  // console.log(productIt);
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
  // console.log("masterCapacity", masterCapacity);
  // console.log("masterUnit", masterUnit);
  useEffect(() => {
    fetchMasterData();
  }, []);
  // console.log('detailProductQuantity', detailProductQuantity)
  useEffect(() => {
    const productDetailOption = [];
    if (masterCapacity?.length > 0) {
      productIt?.productDetail?.map((e) => {
        const capacity = masterCapacity?.find((cap) => cap.id === e.capacityId);
        const unit = masterUnit?.find((un) => un.id === e.unitId);

        productDetailOption.push({
          capacityId: capacity?.id,
          unitId: unit?.id,
          price: e.price,
          quantity: productIt?.productInventory?.find(
            (q) => q.subProductId === e.id && q.productId === e.productId
          )?.quantity,
          value: capacity?.id + " " + unit?.id,
          name: capacity?.name + " " + unit?.name,
        });
      });

      setProduct({
        id: productIt?.id,
        name: productIt?.name,
        price: productIt?.price,
        content: productIt?.content,
        categorySlug: productIt?.productCategory?.categorySlug,
        slug: productIt?.productSlug,
        acronym: productIt?.acronym,
        expiry: productIt?.expiry,
        nameVi: productIt?.nameVi,
        description: productIt?.description,
        element: productIt?.element,
        uses: productIt?.uses,
        guide: productIt?.guide,
        productCategory: productIt?.productCategory,
        productImage: productIt?.productImage,
        productDetail: productIt?.productDetail,
        productInventory: productIt?.productInventory,
        productDetailOption,
      })
    }
    setPrice(productDetailOption[0]?.price);
    setDetailProductQuantity(productDetailOption[0]?.quantity);
    setCapcity(
      productDetailOption[0]?.capacityId + "-" + productDetailOption[0]?.unitId
    );
    setProductDetailOption(productDetailOption)
  }, [productIt, masterCapacity, masterUnit,]);
  const addCartItem = () => {
    let newItem = {
      slug: productIt.productSlug,
      product: product,
      capacityId: productDetailOption[0]?.capacityId,
      unitId: productDetailOption[0]?.unitId,
      price: productDetailOption[0]?.price,
      quantity: quantity,
      capacity: productDetailOption[0]?.name,
      totalQuantity: detailProductQuantity,
    };
    // console.log("newItem", newItem);
    if (+quantity > detailProductQuantity) {
      setQuantity(detailProductQuantity);
      toast.error(
        `Sản phẩm hiện tại không đủ, chỉ còn ${detailProductQuantity} trong kho`
      );
    }
    const item = value.find(
      (e) =>
        e.slug === newItem?.slug &&
        e.capacityId === newItem?.capacityId &&
        e.unitId === newItem?.unitId
    );
    if (item) {
      if (item.quantity + quantity > detailProductQuantity) {
        toast.error(
          `Sản phẩm hiện tại không đủ, chỉ còn ${detailProductQuantity} trong kho`
        );
        return;
      }
    }
    dispatch(addItem(newItem));
    toast.success("Sản phẩm đẫ thêm vào vỏ hàng");
  };
  const goToCart = () => {
    let newItem = {
      slug: productIt.productSlug,
      product: product,
      capacityId: productDetailOption[0]?.capacityId,
      unitId: productDetailOption[0]?.unitId,
      price: productDetailOption[0]?.price,
      quantity: quantity,
      capacity: productDetailOption[0]?.name,
      totalQuantity: detailProductQuantity,
    };
    // console.log("newItem", newItem);
    if (+quantity > detailProductQuantity) {
      setQuantity(detailProductQuantity);
      toast.error(
        `Sản phẩm hiện tại không đủ, chỉ còn ${detailProductQuantity} trong kho`
      );
    }
    const item = value.find(
      (e) =>
        e.slug === newItem?.slug &&
        e.capacityId === newItem?.capacityId &&
        e.unitId === newItem?.unitId
    );
    if (item) {
      if (item.quantity + quantity > detailProductQuantity) {
        toast.error(
          `Sản phẩm hiện tại không đủ, chỉ còn ${detailProductQuantity} trong kho`
        );
        return;
      }
    }
    dispatch(addItem(newItem));
    router.push('/cart')
    toast.success("Sản phẩm đẫ thêm vào vỏ hàng");
  };

  const getProductRelated = async () => {
    const params = {
      size: 8,
      status: GLOBAL_STATUS.ACTIVE
    };

    const result = await productsApis.getAllProductsClient(params);
    setRelatedProducts(result.rows);
  };
  useEffect(() => {
    getProductRelated()
  }, [])
  // --------------------------------------
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div {...props}>
      <GrPrevious></GrPrevious>
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div {...props}>
      <GrNext></GrNext>
    </div>
  );
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 1,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <>
      <SEO
        image={productIt?.productCategory?.image}
        title={productIt?.name}
        href={productIt?.productCategory?.image}
        content={productIt?.description?.replace(/(<([^>]+)>)/gi, "")}
      ></SEO>
      <div className="pb-8 bg-light-pink">
        <div className="flex items-start py-5 px-28 bg-light-pink max-lg:px-8 max-md:flex-col">
          <div className="w-[60%] flex justify-center gap-5 mt-4 px-4 max-md:w-full">
            <div>
              {productIt?.productImage?.slice(0, 3).map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-[78px] h-[80px] bg-white py-3 mb-3"
                  >
                    {item?.image && (
                      <Image
                        src={item.image}
                        alt=""
                        width={100}
                        height={100}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="max-w-[500px] max-h-[600px]">
              {productIt?.productImage[0]?.image && (
                <Image
                  src={`${productIt?.productImage[0]?.image}`}
                  alt=""
                  width={500}
                  height={500}
                  className='w-full h-full object-contain'
                />
              )}
            </div>
          </div>
          <div className="w-[40%] flex-col items-center justify-center mt-4 text-black px-4 max-md:w-full max-md:mt-14">
            <div className="max-lg:flex max-lg:flex-col max-lg:items-center">
              {productIt?.name && <h2 className="block mt-4 text-4xl font-bold max-lg:text-center">
                {productIt?.name}
              </h2>}
              {productIt?.nameVi && <span className="block mt-4 font-sans text-base max-lg:text-center">
                {productIt?.nameVi}
              </span>}
              {productIt?.acronym && <span className="block mt-4 font-sans text-base max-lg:text-center">
                Mã: {productIt?.acronym}
              </span>}
              <span className="block mt-4 font-sans text-3xl font-bold text-regal-red max-lg:text-center">
                {price?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <span className="block mt-4 text-lg max-lg:text-center">
                Tình trạng:{" "}
                <label className="text-[#8fc83c] font-bold">{detailProductQuantity > 0 ? "Còn hàng" : "Hết hàng"}</label>
              </span>
              <span className="block mt-4 mb-4 text-lg max-lg:text-center">
                Hạn sử dụng: {productIt?.expiry}
              </span>
            </div>
            <div className="flex flex-col max-lg:items-center">
              <p className="font-sans text-xl font-semibold">
                Số lượng
              </p>
              <div className="flex text-2xl font-medium text-center">
                <div
                  className="flex items-center justify-center w-12 h-12 bg-white cursor-pointer"
                  onClick={() => updateQuantity()}
                >
                  -
                </div>
                <input
                  type="text"
                  className="w-12 h-12 text-center bg-white outline-none border-none"
                  value={quantity}
                  readOnly
                />
                <div
                  className="flex items-center justify-center w-12 h-12 bg-white cursor-pointer"
                  onClick={() => updateQuantity("plus")}
                >
                  +
                </div>
              </div>
            </div>
            <div className="text-lg text-white uppercase mt-7">
              <div
                className="flex gap-2 w-full max-lg:items-center"
                onClick={(e) => {
                  // console.log('hellllo', e.target.htmlFor)
                  if (!e.target.htmlFor) return
                  setDetailProductQuantity(product?.productDetailOption.find(
                    (prDetail) => prDetail.value === e.target.htmlFor
                  ).quantity);
                  setPrice(product?.productDetailOption.find(
                    (prDetail) => prDetail.value === e.target.htmlFor
                  ).price);
                  setCapcity(e.target.htmlFor)
                }}>
                {product && product.productDetailOption?.map((optionCapcity) => {
                  // console.log('optionCapcity', optionCapcity)
                  return (
                    <div key={optionCapcity.value} className="max-lg:mx-auto">
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
            </div>
            {detailProductQuantity > 0 ? <div className="flex items-start gap-5 mt-5 text-center max-md:items-center max-md:justify-center">
              <button
                className="py-3 px-6 uppercase border border-regal-red rounded-lg text-[#bc2029] font-bold hover:bg-regal-red hover:text-white transition-all"
                onClick={() => addCartItem()}
              >
                Thêm vào giỏ
              </button>
              <button className="px-8 py-3 font-bold text-white uppercase rounded-lg bg-regal-red" onClick={() => goToCart()}>
                mua ngay
              </button>
            </div> : <div className="mt-3 text-regal-red max-lg:text-center">Sản phẩm này đã hết hàng</div>}
            {detailProductQuantity < 10 && detailProductQuantity !== 0
              && <div className="mt-3 text-regal-red max-lg:text-center">Chỉ còn {detailProductQuantity} sản phẩm</div>}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center py-2 mx-auto mt-5 max-sm:flex-col max-sm:gap-3">
            {introduce.length > 0 &&
              introduce.map((item) => (
                <div
                  key={item.id}
                  className={`${hidden === item.id
                    ? "text-regal-red border-b-[3px] border-regal-red"
                    : ""
                    } p-4  cursor-pointer hover:text-regal-red hover:border-b-[3px] hover:border-regal-red max-sm:p-0`}
                  onClick={() => setHidden(item.id)}
                >
                  <span className="font-sans text-2xl max-md:text-xl">{item.title}</span>
                </div>
              ))}
          </div>
          <div className="mt-4 px-28">
            {hidden === 1 && (
              <div
                className="flex-col mb-4 font-sans text-base leading-4 gap-y-4"
                dangerouslySetInnerHTML={{ __html: productIt?.description }}
              ></div>
            )}
            {hidden === 2 && (
              <div
                className="mb-4 font-sans text-base leading-4"
                dangerouslySetInnerHTML={{ __html: productIt?.element }}
              ></div>
            )}
            {/*  */}
            {hidden === 3 && (
              <div
                className="mb-4 font-sans text-base leading-4"
                dangerouslySetInnerHTML={{ __html: productIt?.guide }}
              ></div>
            )}
            {/*  */}
            {hidden === 4 && (
              <div
                className="mb-4 font-sans text-base leading-4"
                dangerouslySetInnerHTML={{ __html: productIt?.uses }}
              ></div>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* slider bar */}
        <div className="my-10 px-14">
          <Slider {...settings}>
            {relatedProducts?.length > 0 &&
              relatedProducts?.map((item) => {
                return (
                  <div key={item.id}>
                    <ItemSlide propProduct={item}></ItemSlide>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </>
  );
};


export default Item;
