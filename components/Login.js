// import React, { useState, use } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { BiErrorCircle } from "react-icons/bi";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { setProfileAuth, setToken } from "@/redux/accountSlice";
// import { checkConditionLevelUp } from "@/utils/funcs";
// import SEO from "./SEO";
// import { LOGIN_TYPE } from "@/constants";
// import AuthApis from "@/apis/authApis";
// import LocalStorage from "./../utils/storage";
// import { STORAGE_KEY } from "@/constants/storage-key";
// import axiosClient from "@/apis/axiosClient";

// const schema = yup
//   .object({
//     email: yup
//       .string()
//       .email("Email không hợp lệ")
//       .required("Trường bắt buộc")
//       .max(255)
//       .matches(
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Email không đúng định dạng"
//       ),
//     password: yup
//       .string()
//       .required("Trường bắt buộc")
//       .min(6, "Tối thiểu 6 kí tự")
//       .max(30, "Tối đa 30 kí tự")
//       .trim(),
//     type: yup.number().required(),
//   })
//   .required("Trường bắt buộc");

// const Login = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);
//   const [hiddentPass, setHiddentPass] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       type: LOGIN_TYPE.USER,
//     },
//   });
//   const onSubmit = (data) => {
//     const { type, email, password } = data;
//     setLoading(true);
//     AuthApis.login({ type, email, password })
//       .then(({ token }) => {
//         axiosClient.defaults.headers.common = {
//           Authorization: `Bearer ${token}`,
//         };
//         console.log(token);
//         // LocalStorage.set(STORAGE_KEY.TOKEN, token);
//         dispatch(setToken(token));
//         return AuthApis.getProfile();
//       })
//       .then((reponse) => {
//         console.log(reponse);
//         checkConditionLevelUp(reponse);
//         dispatch(setProfileAuth(reponse));
//         router.replace("/");
//       })
//       .catch((err) => {
//         toast.error(err?.response?.data?.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEff
  
//   return (
//     <>
//       {/* <SEO title="Đăng nhập"></SEO> */}
//       <div className="flex items-center my-20">
//         <div className="mx-auto min-w-[25%]">
//           <h3>Đăng nhập</h3>
//           <form
//             className="inline-block w-full bg-white"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div className="flex-col mt-4">
//               <label
//                 className="inline-block mb-3 text-sm font-normal text-black"
//                 htmlFor=""
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   {...register("email")}
//                   placeholder="Nhập email của bạn"
//                   type="text"
//                   className={`inline-block w-full py-2 pl-4 pr-10 bg-[#fff] rounded-md outline-none border text-sm${
//                     errors?.email?.message
//                       ? "focus:ring-2 focus:ring-red-300 border border-red-500 "
//                       : "border border-slate-300 hover:border hover:border-slate-500"
//                   }`}
//                 />
//                 {errors?.email?.message && (
//                   <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2">
//                     <BiErrorCircle className="text-lg text-red-500" />
//                   </span>
//                 )}
//               </div>
//               <span className="font-sans text-sm font-normal text-red-500">
//                 {errors?.email?.message}
//               </span>
//             </div>
//             <div className="flex-col mt-4">
//               <label
//                 className="inline-block mb-3 text-sm font-normal text-black"
//                 htmlFor=""
//               >
//                 Mật khẩu
//               </label>
//               <div className="relative">
//                 <input
//                   {...register("password")}
//                   placeholder="Mật khẩu"
//                   type={hiddentPass ? "password" : "text"}
//                   className={`inline-block w-full py-2 pl-4 pr-10 bg-[#fff] rounded-md outline-none border text-sm ${
//                     errors?.password?.message
//                       ? "focus:ring-2 focus:ring-red-300 border border-red-500 "
//                       : "border border-slate-300 hover:border hover:border-slate-500"
//                   }`}
//                 />
//                 <span
//                   className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2"
//                   onClick={() => setHiddentPass(!hiddentPass)}
//                 >
//                   {hiddentPass ? (
//                     <AiOutlineEyeInvisible className="opacity-60"></AiOutlineEyeInvisible>
//                   ) : (
//                     <AiOutlineEye className="opacity-60"></AiOutlineEye>
//                   )}
//                 </span>
//               </div>
//               <span className="font-sans text-sm font-normal text-red-500">
//                 {errors?.password?.message}
//               </span>
//             </div>
//             <div className="mt-4 cursor-pointer">
//               <span className="text-sm text-regal-red hover:text-yellow-400">
//                 Quên mật khẩu
//               </span>
//             </div>
//             <button
//               type="submit"
//               className={`relative flex items-center justify-center w-full gap-4 py-2 mt-5 text-base text-white rounded-md cursor-pointer bg-regal-red 
//             ${
//               loading
//                 ? 'after:content-[" "] after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:h-full after:rounded-md after:bg-slate-200 after:bg-opacity-50'
//                 : ""
//             }`}
//             >
//               {loading && (
//                 <div className="w-[18px] h-[18px] border-[4px] border-white border-r-[4px] border-r-transparent  rounded-full bg-opacity-40 transition-all animate-spin"></div>
//               )}
//               Đăng nhập
//             </button>
//             <div className="flex items-center justify-center mt-5">
//               <span className="text-xs text-center">
//                 Bạn đã có tài khoản SHESHI?{" "}
//                 <strong className="ml-1 text-[14px] text-regal-red hover:text-yellow-400">
//                   Đăng kí
//                 </strong>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
