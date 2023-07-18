import dynamic from 'next/dynamic'
const NavbarUser = dynamic(() => import('../../components/NavbarUser'), { ssr: false, })
const OrderContent = dynamic(() => import('../../components/OrderContent'), { ssr: false, })
const OrderDetailsRow = dynamic(() => import('../../components/OrderDetailsRow'), { ssr: false, })
import commissionApis from '@/apis/commissionApis'
import orderApis from '@/apis/orderApis'
// import NavbarUser from '@/components/NavbarUser'
// import OrderContent from '@/components/OrderContent'
// import OrderDetailsRow from '@/components/OrderDetailsRow'
import { COMMISSION_TYPE, MASTER_DATA_NAME, STATUS_ORDER } from '@/constants'
import { useLocation } from '@/hook/useLocation'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { SEO } from '@/components'

async function fetchMasterCapacity(params) {
    const res = await axios.get(`http://localhost:3001/api/master`, {
        params: {
            idMaster: params,
        },
    });
    return res.data.rows;
}

const PageSlugOrder = () => {
    const router = useRouter()
    const { token, info } = useSelector((state) => state.account);
    // console.log(info)
    // console.log(router.query.slugOrder)

    // const [slug, setSlug] = useState(router.query.slugOrder)
    const [masterCapacity, setMasterCapacity] = useState();
    const [masterUnit, setMasterUnit] = useState();
    const [masterOrderStatus, setMasterOrderStatus] = useState();
    const [orderDetail, setOrderDetail] = useState()
    // console.log('orderDetail', orderDetail)
    const [product, setProduct] = useState([]);
    const [commission, setCommission] = useState()


    const fetchMasterData = async () => {
        const masterOrder = await fetchMasterCapacity(
            MASTER_DATA_NAME.STATUS_ORDER
        );
        const DataMasterCapacity = await fetchMasterCapacity(
            MASTER_DATA_NAME.CAPACITY_PRODUCT
        );
        const DataMasterUnit = await fetchMasterCapacity(
            MASTER_DATA_NAME.UNIT_PRODUCT
        );
        setMasterCapacity(DataMasterCapacity);
        setMasterUnit(DataMasterUnit);
        setMasterOrderStatus(masterOrder);

    };

    const address = useLocation(orderDetail?.cityCode, orderDetail?.districtCode, orderDetail?.wardCode)
    // console.log(address)

    const fetchOrderList = useCallback(async () => {
        let cartItemsInfo = []
        const productOption = [];
        if (!router.query.slugOrder) return
        const orderUser = await orderApis.getOrderByOrderCode({
            orderCode: router.query.slugOrder
        });
        if (info?.id !== orderUser?.userId) {
            return
        }
        if (orderUser) {
            await Promise.all(orderUser?.orderItem.map(async (item) => {
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
        }
        if (masterCapacity?.length > 0) {
            cartItemsInfo.map((e) => {
                // console.log("capacity", e);
                const capacity = masterCapacity?.find((cap) => cap.id === e.capacityId)?.name;
                const unit = masterUnit?.find((un) => un.id === e.unitId)?.name;
                productOption.push({
                    name: capacity + " " + unit,
                    id: e.id,
                    productId: e.productId,
                });
                setProduct(productOption);
            });
        }
        setOrderDetail(orderUser)
    }, [info, masterCapacity, masterUnit, router])

    const cancelOrder = async () => {
        const body = {
            status: STATUS_ORDER.REJECT,
            productDetail: orderDetail.orderItem,
        }
        Swal.fire({
            title: 'Bạn thật sự',
            text: "muốn huỷ đơn hàng không ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                orderApis.cancelOrder(orderDetail.id, body)
                    .then(() => { })
                    .catch(err => toast.error(err.mesage))
                    .finally(() => {
                        fetchOrderList()
                    });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
        // return orderApis.cancelOrder(order.id, body)
        // .then(() => toast.success('Bạn đã huỷ đơn hành thành công'))
        // .catch(err => toast.error(err.mesage))
        // .finally(() => {
        //   getCartItemsInfo()
        // });
    }


    useEffect(() => {
        fetchMasterData();
    }, []);
    useEffect(() => {
        fetchOrderList();
    }, [fetchOrderList])

    const getListCommission = useCallback(async () => {
        const listCommission = await commissionApis.getlistCommissionLevel({
            idLevel: info ? info.level : 0,
            type: COMMISSION_TYPE.AUTOMATION
        })
        setCommission(info ? listCommission[0].commissionConfig.percent : null)
    }, [info])
    useEffect(() => {
        getListCommission()
    }, [getListCommission])
    // console.log('commisstion, ', commission)
    useEffect(() => {
        if (!token) {
            router.push('/login', undefined, { shallow: true })
        }
    }, [router, token])
    return (
        <>
            <SEO title="Đơn hàng"></SEO>
            <div className="flex items-start justify-center gap-5 px-24 mt-8 mb-20 max-lg:px-8 max-md:flex-col max-md:px-3 max-sm:mb-8">
                <NavbarUser bgPage='my-order'></NavbarUser>
                <div className="w-[75%] flex-col items-start max-md:w-full">
                    <div className="flex flex-col items-center ">
                        <h4 className="text-[22px]">Chi tiết đơn hàng</h4>
                        {!!orderDetail ? (
                            <div className="flex flex-col py-8 w-full ">
                                <div className="flex items-center justify-between max-md:items-start">
                                    <div className="flex flex-col items-start justify-center gap-4 mb-14">
                                        <span>
                                            Hóa đơn: <strong>{orderDetail && `#${orderDetail.orderCode}`}</strong>
                                        </span>
                                        <span>
                                            Đặt ngày{" "}
                                            {orderDetail &&
                                                moment(orderDetail?.orderDate).format(
                                                    "DD-MM-YYY h:mm:ss"
                                                )}
                                        </span>
                                        <span>
                                            Trạng thái đơn hàng:{" "}
                                            {orderDetail &&
                                                masterOrderStatus?.find(
                                                    (e) => e.id === orderDetail.orderStatus
                                                )?.name}
                                        </span>
                                    </div>
                                    <button
                                        disabled={
                                            orderDetail?.orderStatus !== STATUS_ORDER.WAITTING_CONFIRM
                                        }
                                        onClick={() => cancelOrder()}
                                        className={`relative px-3 py-2 font-serif text-base font-light text-white border rounded-md bg-regal-red 
                ${orderDetail?.orderStatus !== STATUS_ORDER.WAITTING_CONFIRM
                                                ? "cursor-not-allowed after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-slate-200 after:bg-opacity-30"
                                                : ""
                                            }`}
                                    >
                                        <span>Hủy đơn hàng</span>
                                    </button>
                                </div>
                                <OrderContent
                                    orderSearchItem={orderDetail}
                                    address={address}
                                ></OrderContent>
                                <OrderDetailsRow order={orderDetail} product={product}></OrderDetailsRow>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default PageSlugOrder