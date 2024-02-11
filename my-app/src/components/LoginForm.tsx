"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { formMutation, loginMutation } from "@/queryFn/formMutation";
import { toast } from "react-toastify";
import { useGlobalState } from "@/context/GlobalContext";
import { Loader, LoginIcon } from "./loaderAndIcons";

const LoginForm = () => {
  const { tokenInLocal } = useGlobalState();
  const mutation = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      tokenInLocal(data);
      toast("login success full");
      console.log(data);
    },
    onError: (error) => {
      toast.error("wrong credential");
      console.log(error);
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });
  if (mutation.isPending) {
    return <Loader />;
  }

  return (
    <>
      <div className=" absolute top-[10vw] text-center">
        <LoginIcon />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col h-[30vw] bg-[#F3CCF3] w-full max-w-[20vw] shadow-md p-[2vw] rounded-lg"
      >
        <input
          type="email"
          placeholder="example@gmail.com"
          name="email"
          onChange={formik.handleChange}
          className="mt-[8vw] p-[0.5vw] outline-none bg-[#F3CCF3] placeholder:text-black  focus:border-b border-solid border-black placeholder:bg-[#F3CCF3]"
          style={{
            borderBottom:
              formik.touched.email && formik.errors.email
                ? "3px solid red"
                : "3px solid black",
          }}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={formik.handleChange}
          className="mt-[3vw] p-[0.5vw] outline-none bg-[#F3CCF3] placeholder:text-black  focus:border-b border-solid border-black"
          style={{
            borderBottom:
              formik.touched.email && formik.errors.email
                ? "3px solid red"
                : "3px solid black",
          }}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button
          type="submit"
          className="mt-[3vw] p-[0.5vw] outline-none bg-[#5c1d5c] text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
