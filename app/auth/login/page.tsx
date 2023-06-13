"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { AiFillUnlock } from "react-icons/ai";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { getCookie, setCookies } from "cookies-next";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch("https://grego.pedro-losas.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const dataResponse = await res.json();
      if (dataResponse.error) {
        throw new Error(dataResponse.message);
      }

      setCookies("token", dataResponse.token, { path: "/" });
      toast.success("Login Success");
      setLoading(false);
      setInterval(() => {
        reset();
        router.replace("/");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
      reset();
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    console.log({ token });
    if (token) {
      return router.replace("/");
    }
  }, [router]);

  return (
    <div className=" min-w-max  min-h-screen flex flex-col justify-center items-center  bg-blue-500 bg-gradient-to-t from-gray-800 ">
      <Toaster />
      <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
        <div
          className=" w-36 h-36  bg-gray-950 p-5 rounded-full absolute flex opacity-80 justify-center items-center"
          style={{ marginTop: -100 }}
        >
          <FaRegUser size={90} color="white" />
        </div>
        <div className="flex flex-col justify-center bg-sky-950 px-4 sm:px-6 md:px-8 lg:px-10 py-8 shadow-2xl ">
          <div className="relative text-gray-800 w-auto border mt-12">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FaRegUser size={19} className="text-gray-700" />
            </span>
            <input
              type="text"
              className="py-2  bg-gray-100  pl-10 focus:outline-none  focus:text-gray-900 placeholder-gray-800 text-xl"
              placeholder="User Name"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <span className="text-red-600 text-end">
              {(errors.email.message as string) || "Email is required"}
            </span>
          )}
          <div className="relative text-gray-800 border mt-5">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <AiFillUnlock size={22} className="text-gray-700" />
            </span>
            <input
              type="password"
              className="py-2  bg-gray-100  pl-10 focus:outline-none  focus:text-gray-900 placeholder-gray-800 text-xl"
              placeholder="password"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^.{6,}$/,
                  message: "invalid password",
                },
              })}
            />
          </div>
          {errors.password && (
            <span className="text-red-600 text-end">
              {(errors.password.message as string) || "Password is required"}
            </span>
          )}
          <div className="flex justify-between items-center mb-4 mt-10">
            <div className="flex items-center ">
              <input
                checked
                id="default-checkbox"
                type="checkbox"
                className="bg-blue-900 accent-gray-900 text-xl h-5 w-5"
                {...register("remember")}
              />
              <label className="ml-2  font-medium text-gray-300">
                Remember me
              </label>
            </div>
            <Link className="text-gray-200" href="#">
              Forgot Password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-52 bg-gray-950 uppercase absolute ml-20 mr-20 hover:bg-zinc-900 text-white py-4  opacity-80 "
              {...(loading ? { disabled: true } : {})}
            >
              Login
            </button>
          </div>
        </div>
      </form>

      <div
        className=" sm:w-full md:w-1/3"
        style={{
          position: "absolute",
          bottom: "170px",
          padding: 10,
          height: 20,
          background: "black",
          borderRadius: "100%",
          filter: "blur(27px)",
        }}
      ></div>
    </div>
  );
};

export default Login;
