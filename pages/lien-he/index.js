import configPageApis from "@/apis/configPageApis";
import contractApis from "@/apis/contractApis";
import { Input, SEO, Title } from "@/components";
import { CONTACT_PAGE } from "@/constants";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BiErrorCircle } from "react-icons/bi";

const schema = yup
  .object({
    fullName: yup.string().required("Trường bắt buộc").min(3).max(50).trim(),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Trường bắt buộc")
      .max(255)
      .matches(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Vui long nhap email hop le"
      ).trim(),
    phoneNumber: yup
      .string()
      .required("Tối thiểu 10 kí tự")
      .min(10, "Tối thiểu 10 kí tự")
      .max(10, "Tối thiểu 10 kí tự")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Không đúng số điện thoại"
      ),
  })
  .required();

const LienHe = ({ contact }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      content: "",
    },
  });

  const onSubmit = (data) => {
    contractApis
      .createContractData(data)
      .then((data) => {
        console.log(data.data)
        reset({
          fullName: "",
          email: "",
          phoneNumber: "",
          content: "",
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };
  return (
    <>
      <SEO title="LIÊN HỆ VỚI SHESHI"></SEO>
      {/* <Head>
        <link rel="icon" href="/logosheshe.png" />
        <title>LIÊN HỆ SHESHI</title>
      </Head> */}
      <div className="py-5 mb-10 bg-light-pink">
        <Title className="text-3xl font-bold">liên hệ</Title>
      </div>
      <div className="flex justify-center mx-auto my-14 max-md:flex-col">
        <div className="flex-col w-full px-24 mx-auto max-lg:px-10 max-sm:px-2">
          <div className="mb-5">
            <span className="block text-[18px] font-medium font-sans">
              Nếu bạn có thắc mắc hãy liên hệ với chúng tôi qua địa chỉ
            </span>
          </div>
          <div className="flex mx-auto mb-4">
            <div className="text-lg w-[40%]  font-sans">Điện thoại:</div>
            <p className="font-sans text-lg">{contact.telephone}</p>
          </div>
          <div className="flex mx-auto mb-4">
            <p className="text-lg w-[40%] font-sans">Địa chỉ:</p>
            <p className="font-sans text-lg">{contact.address}</p>
          </div>
          <div className="flex mx-auto mb-4">
            <p className="text-lg w-[40%] font-sans">Email:</p>
            <p className="font-sans text-lg">{contact.email}</p>
          </div>
          <div className="flex mx-auto mb-4">
            <p className="text-lg w-[40%] shrink-0 font-sans">
              Thời gian làm việc:
            </p>
            <p className="font-sans text-lg">{contact.timeWorking}</p>
          </div>
        </div>
        <div className="w-full px-20 max-lg:px-10 max-sm:px-2">
          <h3 className="mb-5 text-3xl font-bold max-sm:text-2xl max-sm:inline-block">
            Gửi thắc mắc cho chúng tôi
          </h3>
          <p className="mb-5 text-base font-bold leading-6 tracking-wider text-small-font-color">
            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi và chúng
            tôi <br /> sẽ liên lạc với bạn sớm nhất có thể
          </p>
          <div className="max-sm:px-2">
            <form className="text-base" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-start gap-8 max-sm:flex-col">
                <div className="bg-transparent max-sm:w-full">
                  <label className="relative top-0">
                    <input
                      text="text"
                      placeholder="Họ và tên"
                      {...register("fullName")}
                      className={`py-3 pl-3 pr-20 rounded-md outline-none text-base border border-slate-300 ${errors?.fullName?.message
                        ? "focus:ring-2 focus:ring-red-300 border border-red-500 "
                        : "border border-slate-300 hover:border hover:border-slate-500"
                        }`}
                    />
                    {errors?.fullName?.message && (
                      <span className="absolute top-0 right-0 -translate-x-1/2">
                        <BiErrorCircle className="text-lg text-red-500" />
                      </span>
                    )}
                  </label>
                  <span className="font-sans text-sm font-normal text-red-500">
                    {errors?.fullName?.message}
                  </span>
                </div>
                <div className="bg-transparent max-sm:w-full">
                  <label className="relative top-0">
                    <input
                      text="email"
                      placeholder="Nhập email của bạn"
                      {...register("email", { required: "This is required" })}
                      className={`py-3 pl-3 pr-20 rounded-md outline-none text-base border border-slate-300 ${errors?.email?.message
                        ? "focus:ring-2 focus:ring-red-300 border border-red-500 "
                        : "border border-slate-300 hover:border hover:border-slate-500"
                        }`}
                    />
                    {errors.email && (
                      <span className="absolute top-0 right-0 -translate-x-1/2">
                        <BiErrorCircle className="text-lg text-red-500" />
                      </span>
                    )}
                  </label>
                  <span className="font-sans text-sm font-normal text-red-500">
                    {errors?.email?.message}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <label className="relative top-0">
                  <input
                    placeholder="Số điện thoại"
                    {...register("phoneNumber", {
                      required: "This is required",
                    })}
                    className={`w-full py-3 px-4 rounded-md outline-none text-base border border-slate-300 ${errors?.phoneNumber?.message
                      ? "focus:ring-2 focus:ring-red-300 border border-red-500 "
                      : "border border-slate-300 hover:border hover:border-slate-500"
                      }`}
                  ></input>
                  {errors?.phoneNumber && (
                    <span className="absolute top-0 right-0 -translate-x-1/2">
                      <BiErrorCircle className="text-lg text-red-500" />
                    </span>
                  )}
                </label>
                <span className="font-sans text-sm font-normal text-red-500">
                  {errors?.phoneNumber?.message}
                </span>
              </div>
              <div className="mt-5">
                <textarea
                  autoComplete="off"
                  className={`outline-none w-full border border-slate-300 rounded-md py-3 px-4 `}
                  placeholder="Nội dung"
                  {...register("content")}
                ></textarea>
              </div>
              <button
                type="submit"
                className="p-2 mt-4 rounded-lg bg-regal-red"
              >
                <span className="text-lg text-center text-white">
                  Gửi cho chúng tôi
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13854.365253907554!2d105.755428!3d20.970836!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134531e3271472f%3A0x2651fde14e086a84!2zMzQ2IFThu5EgSOG7r3UsIExhIEtow6osIEjDoCDEkMO0bmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2sus!4v1680057974036!5m2!1svi!2sus"
          className="m-auto w-[1356px] h-[252px] max-lg:w-[90%]"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const data = await configPageApis.getListConfigPageContact();
  const contact = data.data.find((ct) => ct.type === CONTACT_PAGE.CONTRACT);

  return {
    props: { contact },
  };
}

export default LienHe;
