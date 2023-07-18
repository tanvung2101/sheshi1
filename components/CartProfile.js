import React, { useCallback, useEffect, useState } from 'react'
import {
    BsCurrencyDollar,
    BsGraphUpArrow,
    BsPeople,
} from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import accountApis from "../apis/accountApi";
import configDataApis from "../apis/configDataApis";
import orderApis from '@/apis/orderApis';
import { MASTER_DATA_NAME, STATUS_ORDER } from '@/constants';

const CartProfile = () => {
    const { token, info } = useSelector((state) => state.account);
    const dispatch = useDispatch();


    const [listReferrer, setListReferrer] = useState([])
    const [listReferrerWithLevel, setListReferrerWithLevel] = useState();
    const [myBuyOfMonth, setMyBuyOfMonth] = useState(0);
    const [refBuyOfMonth, setRefBuyOfMonth] = useState(0);
    const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false)

    const getListReferrer = useCallback(async () => {
        const accounts = await accountApis.getMyReferrer(info?.id);
        setListReferrer(accounts)
        const listLevel = await configDataApis.getAllConfigData({
            idMaster: MASTER_DATA_NAME.LEVEL_USER
        })
        const referrerWithLevel = [];
        listLevel.map(level => {
            const userWithLevel = accounts.filter((a) => a.register.level === level.id)
            // const quest = accounts.filter((a) => a.register.level === 0)
            referrerWithLevel.push({
                level: level.name,
                amount: userWithLevel.length,
            })

            setListReferrerWithLevel(referrerWithLevel)
        })

    }, [info])

    const getOrder = async () => {
        const myOrders = await orderApis.getOrderUser();
        const refsOrder = await orderApis.getOrderRef();
        let thisMonth = new Date().getMonth() + 1

        setMyBuyOfMonth(myOrders
            ?.filter((e) => new Date(e.orderDate).getMonth() + 1 === thisMonth && e.orderStatus === STATUS_ORDER.DELIVERED)
            ?.reduce((total, num) => {
                return total + (num.totalBeforeFee)
            }, 0)
        )

        setRefBuyOfMonth(refsOrder
            ?.filter((e) => new Date(e.orderDate).getMonth() + 1 === thisMonth && e.orderStatus === STATUS_ORDER.DELIVERED)
            ?.reduce((total, num) => {
                return total + (num.totalBeforeFee)
            }, 0))

    }

    useEffect(() => {
        getListReferrer()
    }, [getListReferrer])

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <>
            <section className="flex items-start justify-between max-md:flex-col">
                <div className="flex flex-col items-start justify-between gap-2 w-[30%] px-4 py-4 rounded-md bg-slate-200 max-md:w-full">
                    <div className="flex items-center justify-between w-full mb-3">
                        <p className="text-lg font-bold text-regal-red">{myBuyOfMonth.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}</p>
                        <span>
                            <BsCurrencyDollar className="text-4xl text-center text-regal-red"></BsCurrencyDollar>
                        </span>
                    </div>
                    <div className="relative w-full h-1 rounded-full bg-slate-200">
                        <div style={{
                            width: `${Math.round((myBuyOfMonth / 15000000) * 100)}%`
                        }} className={`absolute top-0 left-0 right-0 h-1 bg-red-500 rounded-full`}></div>
                    </div>
                    <p className="text-sm">Doanh số trong tháng</p>
                </div>
                <div className="flex flex-col items-start justify-between gap-2 w-[30%] px-4 py-4 rounded-md bg-slate-200 max-md:w-full max-md:mt-4">
                    <div className="flex items-center justify-between w-full mb-3">
                        <p className="text-lg font-bold text-[#0dcaf0]">{refBuyOfMonth.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}</p>
                        <span>
                            <BsGraphUpArrow className="text-4xl text-center text-[#0dcaf0]"></BsGraphUpArrow>
                        </span>
                    </div>
                    <div className="relative w-full h-1 rounded-full bg-slate-200">
                        <div style={{
                            width: `${Math.round((refBuyOfMonth / 15000000) * 100)}%`
                        }} className={`absolute top-0 left-0 right-0 h-1 bg-[#0dcaf0] rounded-full`}></div>
                    </div>
                    <p className="text-sm">Doanh số người giới thiệu trong tháng</p>
                </div>
                <div className="flex flex-col items-start justify-between gap-2 w-[30%] px-4 py-4 rounded-md bg-slate-200 max-md:w-full max-md:mt-4">
                    <div className="flex items-center justify-between w-full mb-3">
                        <p className="text-lg font-bold text-yellow-300">{listReferrer.length}</p>
                        <span>
                            <BsPeople className="text-4xl text-center text-yellow-300"></BsPeople>
                        </span>
                    </div>
                    <div className="relative w-full h-1 rounded-full bg-slate-200">
                        <div style={{
                            width: `${Math.round((listReferrer.length / 20) * 100)}%`
                        }} className={`absolute top-0 left-0 right-0  h-1 bg-yellow-300 rounded-full`}></div>
                    </div>
                    <p className="text-sm">Số lượng người giới thiệu</p>
                </div>
            </section>
            <section className="px-1 pt-16">
                <h3 className="font-sans font-bold text-3xl">Thông tin cá nhân</h3>
            </section>
        </>
    )
}

export default CartProfile