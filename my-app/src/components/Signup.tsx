"use client";

import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { Button } from "./ui/button";

const Signup = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<any>(null);
  const coverImageFileInputRef = useRef<any>(null);
  const validateSchema = Yup.object().shape({
    username: Yup.string()
      .required("This field is required")
      .min(3, "Name must be 3 or more characters"),

    email: Yup.string()
      .email("Please enter a valid email")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      ),
  });
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      avatar: "",
      coverImage: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("username", values?.username);
        formData.append("password", values?.password);
        formData.append("email", values?.email);
        formData.append("avatar", values?.avatar);
        formData.append("coverImage", values?.coverImage);
        console.log(formData);
        const resp = await axios.post(
          "http://localhost:8000/api/v1/registerUser",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(resp);
        resetForm(); // Reset the form after successful submission
      } catch (err: any) {
        console.error("Error registering user:", err.message);
        // Handle errors
      }
    },
  });

  function handleImage(e: any, fieldName: string) {
    setFieldValue(fieldName, e.currentTarget.files[0]);

    const file = e.currentTarget.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);

      // Update the appropriate preview state based on the field name
      if (fieldName === "avatar") {
        setImagePreview(previewURL);
      } else if (fieldName === "coverImage") {
        setCoverImagePreview(previewURL);
      }
    }
  }

  // function uploadCoverImage() {
  //   if (coverImageFileInputRef.current) {
  //     coverImageFileInputRef.current.click();
  //   }
  // }
  function uploadImages(inputRef: React.RefObject<HTMLInputElement>) {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  return (
    <main className=" ">
      {imagePreview && (
        <Image
          src={imagePreview}
          width={100}
          height={100}
          alt="Preview"
          className="rounded-full"
        />
      )}
      <form
        onSubmit={handleSubmit}
        className=" p-[2vw] grid grid-cols-2 gap-[1.5vw] bg-red-500 w-full max-w-[50vw]"
      >
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="username"
          className={`p-[0.5vw] ${
            errors.username && "bg-red-200 border-[2px] border-red-900"
          } border-[1px] border-red-500 w-full max-w-[20vw]`}
        />

        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="email"
          className={`p-[0.5vw] ${
            errors.email && "bg-red-200 border-[2px] border-red-900"
          } col-span-2 border-[1px] border-red-500`}
        />

        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="password"
          className={`p-[0.5vw] ${
            errors.password && "bg-red-200 border-[2px] border-red-900"
          } border-[1px] border-red-500`}
        />

        <input
          type="file"
          placeholder="profile image"
          name="avatar"
          onChange={(e) => handleImage(e, "avatar")}
          ref={fileInputRef}
          hidden
        />

        <input
          type="file"
          placeholder="profile image"
          name="coverImage"
          ref={coverImageFileInputRef}
          onChange={(e) => handleImage(e, "coverImage")}
          hidden
        />

        <Button type="submit">submit</Button>
      </form>
      <Button onClick={() => uploadImages(coverImageFileInputRef)}>
        upload coverImage
      </Button>
      <Button onClick={() => uploadImages(fileInputRef)}>profile image</Button>
    </main>
  );
};

export default Signup;
