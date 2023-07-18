import orderApis from "@/apis/orderApis";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { MASTER_DATA_NAME, STATUS_ORDER } from "@/constants";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { useLocation } from "@/hook/useLocation";
import OrderContent from "@/components/OrderContent";
import OrderDetailsRow from "@/components/OrderDetailsRow";
import { SEO } from "@/components";

// SHESHI000351

async function fetchMasterCapacity(params) {
  const res = await axios.get(`http://localhost:3001/api/master`, {
    params: {
      idMaster: params,
    },
  });
  return res.data.rows;
}

function PagePaymentSucces() {
  const { query } = useRouter();
  const [order, setOrder] = useState();
  const [masterCapacity, setMasterCapacity] = useState();
  const [masterUnit, setMasterUnit] = useState();
  const [product, setProduct] = useState([]);

  const address = useLocation(order?.cityCode, order?.districtCode, order?.wardCode)

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
  // const getOrderCode = useCallback(async () => {
  //   const orderCode = await orderApis.getOrderByOrderCode({
  //     orderCode: query?.order,
  //   });
  //   setOrder(orderCode)
  // }, [query?.order])
  useEffect(() => {
    fetchMasterData();
  }, []);
  // useEffect(() => {
  //   getOrderCode();
  // }, [getOrderCode]);

  const getCartItemsInfo = useCallback(async () => {
    let cartItemsInfo = []
    const productOption = [];
    const order = await orderApis.getOrderByOrderCode({
      orderCode: query?.order,
    });
    setOrder(order)
    if (!order) return null
    await Promise.all(order.orderItem?.map(async (item) => {
      const params = {
        productId: item.productId,
        id: item.subProductId,
      };
      const data = await axios.get(
        "http://localhost:3001/api/product/get-capacity-product",
        { params }
      );
      cartItemsInfo.push(data.data);
    }))

    if (masterCapacity?.length > 0) {
      cartItemsInfo.map((e) => {
        // console.log("capacity", e);
        const capacity = masterCapacity?.find((cap) => cap.id === e.capacityId);
        const unit = masterUnit?.find((un) => un.id === e.unitId);
        productOption.push({
          capacityId: capacity?.id,
          unitId: unit?.id,
          price: e.price,
          value: capacity?.id + " " + unit?.id,
          name: capacity?.name + " " + unit?.name,
          id: e.id,
          productId: e.productId,
        });
        setProduct(productOption);
      });
    }
  }, [masterCapacity, masterUnit, query]);
  useEffect(() => {
    getCartItemsInfo();
  }, [getCartItemsInfo]);
  const cancelOrder = async () => {
    const body = {
      status: STATUS_ORDER.REJECT,
      productDetail: order?.orderItem,
    };
    return Swal.fire({
      title: "Bạn thật sự",
      text: "muốn huỷ đơn hàng không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        orderApis
          .cancelOrder(order.id, body)
          .then(() => { })
          .catch((err) => toast.error(err.mesage))
          .finally(() => {
            console.log('tahnhf công')
            getCartItemsInfo()
          }
          );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    // return orderApis.cancelOrder(order.id, body)
    //   .then(() => toast.success('Bạn đã huỷ đơn hành thành công'))
    //   .catch(err => toast.error(err.mesage))
    //   .finally(() => {
    //     getCartItemsInfo()
    //   });
  };
  if (!order) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <SEO title="Thanh toán"></SEO>
      {order && (
        <div className="px-40 mt-10 max-lg:px-20 max-md:px-10">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 bg-[#f6f6f6] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mb-4 w-14 h-14 text-regal-red"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h3 className="mt-4 font-sans uppercase">thank you</h3>
            <div className="mb-4">
              <span className="font-sans text-lg">
                Đơn đặt hàng của bạn đã hoàn tất.
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 text-lg font-extralight">
              <span>
                ORDER: <strong>{query.order}</strong>
              </span>
              <span>Chúng tôi đã xác nhận đơn hàng của bạn.</span>
              <span className="text-center">
                Nếu có bất kỳ thắc mắc về đơn hàng của bạn, vui lòng liên hệ với
                chúng tôi hoặc dùng chức năng theo dõi đơn hàng
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center my-14 w-full">
            <h4 className="text-[22px]">Chi tiết đơn hàng</h4>
            <OrderContent
              orderSearchItem={order}
              address={address}
            ></OrderContent>
            {/* <div className="mt-10 w-full border-b-[1px] border-b-gray-300"> */}
            <OrderDetailsRow order={order} product={product}></OrderDetailsRow>
            {/* </div> */}
            {/* <div className="w-full mt-2">
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
                    {(order?.total - order?.totalBeforeFee).toLocaleString(
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
            </div> */}
          </div>

          <div className="flex items-center justify-center gap-8 mb-14 max-sm:flex-col">
            <button className="px-3 py-2 font-serif text-base font-light text-white border rounded-md border-regal-red bg-regal-red">
              <Link href="/">Quay trở lại trang chủ</Link>
            </button>
            <button
              disabled={
                order?.orderStatus !== STATUS_ORDER.WAITTING_CONFIRM
              }
              onClick={cancelOrder}
              className={`relative px-3 py-2 font-serif text-base font-light text-white border rounded-md bg-regal-red 
                ${order?.orderStatus !== STATUS_ORDER.WAITTING_CONFIRM
                  ? "cursor-not-allowed after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-slate-200 after:bg-opacity-30"
                  : ""
                }`}
            >
              <span>Hủy đơn hàng</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// export async function getStaticPaths(context) {
//   console.log(context)
//   return {
//     paths: [
//       {
//         params: {
//           order: "SHESHI000358",
//         },
//       },
//     ],
//     fallback: true
//   };
// }

// export async function getServerSideProps(context) {
//   const { order } = context.params;
//   if (!order) {

//   }
//   // console.log(order);
//   const params = order;
//   const orderCode = await axios.get(
//     `http://0.0.0.0:3001/api/order/search-order?orderCode=${params}`
//   );
//   // console.log(orderCode.data);
//   return {
//     props: { orderCode: orderCode.data },
//   };
// }

export default PagePaymentSucces;
