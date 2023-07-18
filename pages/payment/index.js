import { Button, SEO } from "@/components";
import CartEmpty from "@/components/CartEmpty";
import CartTabs from "@/components/CartTabs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import shipApis from "@/apis/shipApi";
import { COMMISSION_TYPE, TOKEN_API } from "@/constants";
import orderApis from "./../../apis/orderApis";
import { deleteAll } from "@/redux/cartItemSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import commissionApis from "@/apis/commissionApis";
import { getLocation } from "@/components/location-vn";

const schema = yup
  .object({
    notes: yup.string().max(255).trim().nullable(),
    deliveryMethod: yup.mixed().required(),
  })
  .required();

const Payment = () => {
  const router = useRouter()
  const { value } = useSelector((state) => state.cartItem);
  const dispatch = useDispatch();
  const { information } = useSelector((state) => state.cartItem);
  const { info } = useSelector((state) => state.account);
  console.log('indwiurg', information)

  const [totalPrice, setTotalPrice] = useState(0);
  const [commission, setCommission] = useState()

  const [cartProduct, setCartProduct] = useState();
  const [unitGhn, setUnitGhn] = useState();
  const [unitGhtk, setUnitGhtk] = useState();
  const [fee, setFee] = useState(0);

  const [selectMethodPayment, setSelectMethodPayment] = useState(0);
  const [selectBank, setSelectBank] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
    }
  });

  const [loadingSelectPayment, setLoadingSelectPayment] = useState(false);
  const [loading, setLoading] = useState(true)

  const onSubmit = async (data) => {
    const { notes, deliveryMethod, paymentMethod } = data;
    let typePayment = paymentMethod === "0" ? "0" : `${selectBank}`;
    console.log('selectBank', typePayment)
    const body = {
      address: information?.address,
      cityCode: information?.cityCode,
      deliveryMethod,
      paymentMethod: typePayment,
      note: notes,
      fee: fee,
      listProduct: value,
      userId: null,
      telephone: `+${information?.phoneCode} ${information?.phoneNumber}`,
      email: information?.email,
      referralCode: information?.referralCode,
      fullName: information?.fullname,
      districtCode: information?.districtCode,
      wardCode: information?.wardCode,
      districtAndCity: {
        city: information?.cityCode,
        district: information?.districtCode,
        ward: information?.wardCode,
      },
    };
    setLoadingSelectPayment(true)
    orderApis
      .createOrder(body)
      .then((reponse) => {
        console.log("reponse", reponse)
        if (typePayment === "0") {
          dispatch(deleteAll());
          toast.success('Bạn đã thanh toán thành công')
          router.push(`/payment-success/${reponse?.order?.orderCode}`)
        }
        // else if (typePayment === "1") {
        //   console.log('typePayment === "1"', reponse.order.orderCode)
        //   orderApis
        //     .createPaymentMomo({
        //       requestType: "captureWallet",
        //       ipnUrl: `${window.location.origin}/payment-success/${reponse.order.orderCode}`,
        //       redirectUrl: `${window.location.origin}/payment-success/${reponse.order.orderCode}`,
        //       amount: reponse.order.total,
        //       orderInfo: `CK cho đơn hàng ${reponse.order.orderCode}`,
        //       extraData: "",
        //     })
        //     .then(() => {
        //       router.push(`/payment-success/${reponse.order.orderCode}`)
        //     })
        //     .catch((err) => console.log(err)).finally(() => {
        //       dispatch(deleteAll());
        //       // router.replace('/payment')
        //     });
        // } else if (typePayment === "2") {
        //   orderApis
        //     .createPaymentVnpay({
        //       amount: reponse.order.total,
        //       orderDescription: `CK cho đơn hàng ${reponse.order.orderCode}`,
        //       bankCode: "",
        //       orderType: "other",
        //       language: "vn",
        //       returnUrl: `${window.location.origin}/payment-success/${reponse.order.orderCode}`
        //     })
        //     .catch((err) => console.log(err)).finally(() => {
        //       dispatch(deleteAll());
        //     });
        // }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingSelectPayment(false)
      });
  };

  useEffect(() => {
    setTotalPrice(
      value?.reduce((total, currentValue) => {
        return total + Number(currentValue.price * currentValue.quantity);
      }, 0)
    );
  }, [totalPrice, value]);
  const handlerMethodPayment = (e) => {
    setSelectMethodPayment(e.target.value);
  };

  const handlerDeliveryMethod = (e) => {
    setValue("deliveryMethod", e.target.value);
    switch (e.target.value) {
      case "1":
        setFee(unitGhn?.total ? unitGhn?.total : 0);
        break;
      case "2":
        setFee(unitGhtk?.fee ? unitGhtk?.fee : 0);
        break;
    }
  };
  const handlerSelectBank = (e) => {
    setSelectBank(e.target.value);
  };

  // tính phí giao tiết kiệm
  const getFreeGhtk = useCallback(async () => {
    const districtAndCity = await getLocation(
      information.cityCode,
      information.districtCode
    );
    const ghtk = await shipApis.calculatorFeeGhtk({
      pick_province: "Hà Nội",
      pick_district: "Hai Bà Trưng",
      province: districtAndCity.city,
      district: districtAndCity.district,
      address: "P.503 tòa nhà Auu Việt, số 1 Lê Đức Thọ",
      value: totalPrice,
      token: TOKEN_API.GIAO_HANG_TIET_KIEM,
    });
    setUnitGhtk(ghtk.fee);
    setLoading(false)
  }, [information, totalPrice]);

  // tính phí giao hàng nhanh
  const getFreeGhn = useCallback(async () => {
    const districtAndCity = await getLocation(
      information.cityCode,
      information.districtCode
    );
    const fetchCity = await shipApis.getCity();
    setValue("deliveryMethod", "1");
    const provideId = fetchCity?.data?.find(
      (city) => city.ProvinceName === districtAndCity.city
    )?.ProvinceID;

    const fetchDistrict = await shipApis.getDistrict({
      provide_id: provideId,
    });
    console.log("fetchDistrict", fetchDistrict);
    const districtId = fetchDistrict?.data.find(
      (district) =>
        !!district.NameExtension?.find(
          (e) => {
            return (e.toLowerCase() === districtAndCity?.district?.toLowerCase())
          }
        )
    )?.DistrictID;
    if (!districtId) return null
    console.log("districtId", districtId);
    const serviceAvailable = await shipApis.getService({
      from_district: 1488,
      to_district: districtId,
      shop_id: 1,
    });
    const calculatorFee = await shipApis.calculatorFeeGhn({
      from_district_id: 1488,
      service_id: serviceAvailable?.data[0].service_id,
      to_district_id: districtId,
      insurance_value: totalPrice,
      weight: 200,
    });
    // console.log('calculatorFee', calculatorFee)
    setUnitGhn(calculatorFee?.data);
    setFee(calculatorFee?.data.total ? calculatorFee?.data.total : 0);
    setLoading(false)
  }, [information, setValue, totalPrice]);

  useEffect(() => {
    if (totalPrice > 0) {
      getFreeGhn();
      getFreeGhtk();
    }
  }, [totalPrice, getFreeGhn, getFreeGhtk]);

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

  return (
    <>
      <SEO title="Thanh toán"></SEO>
      {value?.length === 0 && <CartEmpty></CartEmpty>}
      {value?.length > 0 && <div className="px-20 mb-16 max-lg:px-10 max-md:px-3">
        <CartTabs className="pt-12" tabs={3} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start justify-start gap-8 max-lg:flex-col">
            <div className="w-[70%] max-lg:w-[80%]">
              <div
                className="flex flex-col border border-gray-300 rounded-md max-lg:mb-5 "
                {...register("deliveryMethod")}
                onChange={handlerDeliveryMethod}
              >
                <div className="px-3 pt-1 pb-3 bg-gray-100 rounded-t-md">
                  <span className="text-[18px] font-medium max-md:text-[16px]">
                    Phương thức giao hàng
                  </span>
                </div>
                <div className="px-3">
                  <label className="flex items-center justify-start gap-5 pt-6 pb-3 pl-4 border-b-[1px] border-gray-200 cursor-pointer">
                    <div id="">
                      <input
                        className="w-5 h-5 radio checked:bg-blue-500"
                        name="ship"
                        type="radio"
                        value={1}
                      />
                    </div>
                    <div className="w-[75px] h-[75px] max-sm:h-[45px]">
                      <Image
                        src="https://play-lh.googleusercontent.com/Q874CkbeX3wp72FaPE-MxGhvkiPOVrpQwNSlYA4za6_WmftSHi4arWI--s5zHF7oejE"
                        alt=""
                        width="100"
                        height="100"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <strong className="text-[18px] max-md:text-[16px]">Giao hàng nhanh</strong>
                    </div>
                  </label>
                  <label className="flex items-center justify-start gap-5 pt-6 pb-3 pl-4  cursor-pointer max-md:text-[16px]">
                    <div id="">
                      <input
                        className="w-5 h-5 radio checked:bg-blue-500"
                        name="ship"
                        type="radio"
                        value={2}
                      />
                    </div>
                    <div className="w-[75px] h-[75px] max-sm:h-[45px]">
                      <Image
                        src="https://play-lh.googleusercontent.com/Q874CkbeX3wp72FaPE-MxGhvkiPOVrpQwNSlYA4za6_WmftSHi4arWI--s5zHF7oejE"
                        alt=""
                        width="100"
                        height="100"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <strong className="text-[18px] max-md:text-[16px]">Giao hàng tiết kiệm</strong>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="px-3 pt-1 pb-3 bg-gray-100 border border-b-0 border-gray-300 rounded-t-md">
                  <span className="text-[18px] font-normal max-md:text-[16px]">
                    Phương thức giao hàng
                  </span>
                </div>
                <div className="border border-gray-300">
                  <label className="flex items-center justify-start gap-5 pt-6 pb-3 pl-4 cursor-pointer">
                    <div>
                      <input
                        {...register("paymentMethod")}
                        className="w-5 h-5 radio checked:bg-blue-500"
                        name="paymentMethod"
                        value={0}
                        type="radio"
                        checked={selectMethodPayment == 0}
                        onChange={handlerMethodPayment}
                      />
                    </div>
                    <div>
                      <p className="text-[16px]">
                        Nhận hàng trả tiền
                      </p>
                    </div>
                  </label>
                  <div>
                    <label className="flex items-center justify-start gap-5 pt-6 pb-3 pl-4 cursor-pointer">
                      <div>
                        <input
                          {...register("paymentMethod")}
                          className="w-5 h-5 radio checked:bg-blue-500"
                          name="paymentMethod"
                          value={1}
                          type="radio"
                          checked={selectMethodPayment == 1}
                          onChange={handlerMethodPayment}
                        />
                      </div>
                      <div>
                        <p className="text-[16px]">Chuyển khoản</p>
                      </div>
                    </label>
                  </div>
                  {selectMethodPayment == 1 && (
                    <div>
                      <div className="flex items-start justify-start gap-5 pt-6 pb-3 pl-4 cursor-pointer max-sm:gap-2">
                        <div className="self-center">
                          <input
                            className="w-5 h-5 radio checked:bg-blue-500"
                            name="bank"
                            type="radio"
                            value={1}
                            checked={selectBank == 1}
                            onChange={handlerSelectBank}
                          />
                        </div>
                        <div className="w-[75px] h-[75px] rounded-md max-sm:h-[45px]">
                          <Image
                            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                            alt=""
                            width="100"
                            height="100"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <strong className="text-[18px]">MOMO</strong>
                          <span className="text-[18px] font-sans">
                            Tên: Sheshi Shop
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start justify-start gap-5 pt-6 pb-3 pl-4 cursor-pointer max-sm:gap-2">
                        <div className="self-center">
                          <input
                            className="w-5 h-5 radio checked:bg-blue-500"
                            id="bank-W5cb6f2d0d84cb"
                            name="bank"
                            type="radio"
                            checked={selectBank == 2}
                            onChange={handlerSelectBank}
                            value={2}
                          />
                        </div>
                        <div className="w-[75px] h-[75px] rounded-md max-sm:h-[45px]">
                          <Image
                            src="https://news.khangz.com/wp-content/uploads/2021/07/VNPAY-la-gi-1.jpg"
                            alt=""
                            width="100"
                            height="100"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <strong className="text-[18px]">VNPAY</strong>
                          <span className="text-[18px] font-sans">
                            Tên: Sheshi Shop
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col mt-5">
                  <label className="text-lg">Ghi chú cho đơn hàng</label>
                  <textarea
                    {...register("notes")}
                    className="border rounded-md outline-none border-slate-700"
                    rows={5}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="w-[30%] max-lg:w-full">
              <div className="mt-0">
                <div className="px-4 py-6 flex flex-col gap-8 shadow-md max-h-full max-lg:max-h-full">
                  <p className="font-sans text-xl font-normal">
                    Bạn đang 1 có sản phẩm trong giỏ hàng
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-lg font-normal">
                      Thành Tiền:
                    </span>
                    <span className="font-sans text-3xl font-bold text-regal-red">
                      {Number(totalPrice)?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-lg font-normal">
                      Phí giao hàng:
                    </span>
                    <span className="font-sans text-3xl font-bold text-regal-red">
                      {Number(fee)?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  {commission && <div className="flex items-center justify-between">
                    <span className="font-sans text-lg font-normal">
                      Hoa hồng cấp ({commission}%)
                    </span>
                    <span className="font-sans text-3xl font-bold text-regal-red">
                      {((totalPrice * commission) / 100)?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-lg font-normal">
                      Tổng:
                    </span>
                    <span className="font-sans text-3xl font-bold text-regal-red">
                      {(totalPrice + fee - (((totalPrice * commission) / 100)))?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-5 max-lg:flex-col">
                    <div className="px-3 py-2 font-serif text-base font-light text-center cursor-pointer transition-all bg-white border rounded-md text-regal-red border-regal-red hover:bg-regal-red hover:text-white max-lg:w-full">
                      <Link href="/payment-confirm">Trở về nhập địa chỉ</Link>
                    </div>
                    <div className="max-lg:w-full">
                      <Button
                        loading={loading}
                        disabled={loadingSelectPayment}
                        type="submit"
                        className="font-serif text-base font-light text-white rounded-md bg-regal-red"
                      >
                        Tiến hàng thanh toán
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>}
    </>
  );
};

export default Payment;
