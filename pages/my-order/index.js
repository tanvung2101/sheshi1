import orderApis from '@/apis/orderApis';
import dynamic from 'next/dynamic'
const NavbarUser = dynamic(() => import('../../components/NavbarUser'), { ssr: false, })
import { MASTER_DATA_NAME } from '@/constants';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { SEO } from '@/components';


const PageMyOrder = () => {
    const { token } = useSelector((state) => state.account);
    const router = useRouter();

    const [orderList, setOrderList] = useState([])
    const [masterOrderStatus, setMasterOrderStatus] = useState()
    const fetchMasterData = async () => {
        const masterOrder = await axios.get('http://localhost:3001/api/master/get-master', {
            idMaster: MASTER_DATA_NAME.STATUS_ORDER
        })
        setMasterOrderStatus(masterOrder.data)
    }
    console.log('masterOrderStatus', masterOrderStatus)
    const fetchOrderList = async () => {
        const orderList = await orderApis.getOrderUser();
        console.log('orderList', orderList)
        setOrderList(orderList)
    }

    useEffect(() => {
        fetchMasterData()
        fetchOrderList()
    }, [])

    useEffect(() => {
        if (!token) {
            router.push('/login', undefined, { shallow: true })
        }
    }, [router, token])
    return (
        <>
            <SEO title="Đơn hàng của tôi"></SEO>
            {token && <div className="flex items-start justify-center gap-5 px-24 mt-8 mb-20 max-lg:px-8 max-md:flex-col max-md:px-3 max-sm:mb-8">
                <NavbarUser bgPage='my-order'></NavbarUser>
                <div className="w-[75%] flex-col items-start max-md:w-full">
                    <h3 className='text-[25px] pb-8'>Đơn hàng của tôi</h3>
                    {orderList && orderList.map(item =>
                        <div key={item.id} className='flex items-center justify-between bg-white p-4 drop-shadow-xl max-md:mt-4 max-sm:flex-col max-sm:items-start'>
                            <div className='flex flex-col items-start gap-2'>
                                <p className='text-2xl font-bold'>Đơn hàng {`#${item?.orderCode}`}</p>
                                <p className='font-normal font-serif'>Tổng giá trị: {item?.total.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                })}</p>
                                <p className='font-normal font-serif'>Tình trạng: <span className='text-green-700'>{masterOrderStatus && masterOrderStatus.find((mas => mas.id === item.orderStatus))?.name}</span></p>
                            </div>
                            <div className='self-end flex items-end pr-28 max-sm:p-0 max-sm:self-start max-sm:mt-2'>
                                <Link href={`my-order/${item?.orderCode}`} className='uppercase text-base font-bold text-regal-red transition-all hover:text-yellow-300'>Xem chi tiết</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>}
        </>
    )
}

export default PageMyOrder