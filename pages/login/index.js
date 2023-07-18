import { Button, Input, SEO } from "@/components";
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LOGIN_TYPE } from "@/constants";
import AuthApis from "@/apis/authApis";
import axiosClient from "@/apis/axiosClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setProfileAuth, setToken } from "@/redux/accountSlice";
import { STORAGE_KEY } from "@/constants/storage-key";
import { checkConditionLevelUp } from "@/utils/funcs";
import dynamic from "next/dynamic";
import axios from "axios";
import Link from "next/link";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// const Login = dynamic(() => import("./../../components/Login"), {
//   ssr: false,
// });

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Trường bắt buộc")
      .max(255)
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email không đúng định dạng"
      ),
    password: yup
      .string()
      .required("Trường bắt buộc")
      .min(6, "Tối thiểu 6 kí tự")
      .max(30, "Tối đa 30 kí tự")
      .trim(),
    type: yup.number().required(),
  })
  .required("Trường bắt buộc");

const PageLogin = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.account);

  const [loading, setLoading] = useState(false);
  const [hiddentPass, setHiddentPass] = useState(false);
  const [data, setData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: LOGIN_TYPE.USER,
    },
  });

  const onSubmit = (values) => {
    const { type, email, password } = values;
    console.log(values)
    // window.localStorage.getItem(STORAGE_KEY.TOKEN)
    setLoading(true);
    AuthApis.login({ type, email, password })
      .then(({ token }) => {
        axiosClient.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        };
        window.localStorage.setItem(STORAGE_KEY.TOKEN, token);
        dispatch(setToken(token));

        return AuthApis.getProfile();
      })
      .then((res) => {
        checkConditionLevelUp(res)
        dispatch(setProfileAuth(res));
        router.push("/", "/", { shallow: true });
      })
      .catch((err) => {
        // toast.error(err?.response?.data?.message);
        toast.error('Mật khẩu hoặc email sai ');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (token) return router.push('/', undefined, { shallow: true })
  }, [router, token])
  return (
    <>
      <SEO title={t('login')}></SEO>

      {!token ? <div className="flex items-center my-20">
        <div className="mx-auto min-w-[25%] max-md:min-w-[80%]">
          <h3 className="text-2xl">{t('login')}</h3>
          <form
            className="inline-block w-full bg-white max-md:block"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex-col mt-4">
              <label
                className="inline-block mb-3 text-sm font-normal text-black"
                htmlFor=""
              >
                {t('email')}
              </label>
              <div className="relative">
                <Input
                  {...register("email")}
                  placeholder={t("enter_your_email")}
                  type="text"
                  errors={errors?.email?.message}
                />
                {errors?.email?.message && (
                  <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2">
                    <BiErrorCircle className="text-lg text-red-500" />
                  </span>
                )}
              </div>
              <span className="font-sans text-sm font-normal text-red-500">
                {errors?.email?.message}
              </span>
            </div>
            <div className="flex-col mt-4">
              <label
                className="inline-block mb-3 text-sm font-normal text-black"
                htmlFor=""
              >
                {t('password')}
              </label>
              <div className="relative">
                <Input
                  {...register("password")}
                  placeholder={t("enter_your_password")}
                  type={hiddentPass ? "password" : "text"}
                  errors={errors?.password?.message}
                />
                <span
                  className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2"
                  onClick={() => setHiddentPass(!hiddentPass)}
                >
                  {hiddentPass ? (
                    <AiOutlineEyeInvisible className="opacity-60"></AiOutlineEyeInvisible>
                  ) : (
                    <AiOutlineEye className="opacity-60"></AiOutlineEye>
                  )}
                </span>
              </div>
              <span className="font-sans text-sm font-normal text-red-500">
                {errors?.password?.message}
              </span>
            </div>
            <div className="mt-4 cursor-pointer mb-10">
              <Link href='/forgot-password' className="text-sm text-regal-red hover:text-yellow-400">
                {t("forgot_password")}
              </Link>
            </div>
            <Button className='w-full' loading={loading} disabled={loading}>{t("login")}</Button>
            <div className="flex items-center justify-center mt-5">
              <span className="text-xs text-center">
                {t("already_account")}
                <Link href='/sign-up' className="ml-1 text-[14px] text-regal-red font-medium hover:text-yellow-400">
                  {t("sign_up")}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div> : null}
    </>
  );
};

export async function getStaticProps({ locale }) {
  console.log(locale)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en'])),
      // Will be passed to the page component as props
    },
  }
}


export default PageLogin;
