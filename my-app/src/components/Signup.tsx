"use client"
import { useState, useRef } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { formMutation } from "@/queryFn/formMutation";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader, SignupIcon } from "./loaderAndIcons";


const Signup = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageState, setImageState] = useState<boolean>(false);
  const controls = useAnimation();
  const navigate = useRouter()
  const mutation = useMutation({
    mutationFn: formMutation,
    onSuccess: (data: any) => {
      console.log(data);
      setImagePreview(null);
      setImageState(false);
      toast.success("user register")
      navigate.push("/")
    },
    onError: (error: any) => {
      console.error(error);
      setImagePreview(null);
      setImageState(false)
      toast.error("wrong credential")
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageFileInputRef = useRef<HTMLInputElement>(null);

  const validateSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password should contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      ),
    gender: Yup.string().required("Gender is required"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    resetForm,
    values,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      avatar: "",
      coverImage: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("avatar", values.avatar);
        formData.append("coverImage", values.coverImage);
        formData.append("gender", values.gender);

        console.log(formData);
        mutation.mutate(formData);
        resetForm(); // Reset the form after successful submission
      } catch (err: any) {
        console.error("Error registering user:", err.message);
        // Handle errors
      }
    },
  });

  function handleImage(e: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFieldValue(fieldName, file);

      if (fieldName === "avatar") {
        setImagePreview(previewURL);
      }
    }
  }

  function uploadImages(inputRef: React.RefObject<HTMLInputElement>) {
   setTimeout(()=>{
    setImageState(true);
   },5000)
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <motion.main  >
      {mutation.isPending ? (
        <>
        
       <Loader />

        </>
      ) : (
        <motion.main className="relative overflow-x-hidden" >
          {imageState ? (
            <div className="absolute w-full max-w-[15vw] h-[15vw] rounded-full top-[1vw] left-[15vw] cursor-pointer">
              {imagePreview && (
                <Image
                  src={imagePreview}
                  width={140}
                  height={140}
                  alt="Preview"
                  className="rounded-full"
                />
              )}
            </div>
          ) : (
            <motion.div   
              onClick={() => uploadImages(fileInputRef)}
              className="w-full max-w-[10vw] h-[10vw] absolute rounded-full top-[1vw] left-[15vw] "
            >
             <SignupIcon />
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="p-[2vw]  bg-[#E1F0DA] w-full max-w-[50vw] shadow-md rounded-md"
          >
            <div className="flex gap-[2vw] w-full mt-[9vw]">
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
                className={`p-[0.5vw] ${
                  errors.firstName && " border-[2px] border-red-200"
                } border-[1px]  w-full max-w-[30vw]`}
              />

              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name"
                className={`p-[0.5vw] ${
                  errors.lastName && " border-[2px] border-red-200"
                } border-[1px]  w-full max-w-[30vw]`}
              />
            </div>

            <div className="flex flex-col w-full mt-[2.5vw]">
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="example@example.com"
                className={`p-[0.5vw] ${
                  errors.email && " border-[2px] border-red-200"
                }  `}
              />

              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                className={`p-[0.5vw] ${
                  errors.password && " border-[2px] border-red-200"
                } mt-[2vw]`}
              />
            </div>

            <div className=" mt-[2vw] w-full flex flex-col">
              Gender:
              <label className="  ">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={values.gender === "male"}
                  onChange={handleChange}
                  className="mx-[0.5vw]"
                />
                Male
              </label>
              <label className=" ">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={values.gender === "female"}
                  onChange={handleChange}
                  className="mx-[0.5vw]"
                />
                Female
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={values.gender === "other"}
                  onChange={handleChange}
                  className="mx-[0.5vw]"
                />
                Other
              </label>
            </div>

            <input
              type="file"
              placeholder="Profile Image"
              name="avatar"
              onChange={(e) => handleImage(e, "avatar")}
              ref={fileInputRef}
              hidden
            />

            <input
              type="file"
              placeholder="Profile Image"
              name="coverImage"
              ref={coverImageFileInputRef}
              onChange={(e) => handleImage(e, "coverImage")}
              hidden
            />

            <motion.button      whileHover={{ scale: 1.1  }}
        whileTap={{ scale: 0.9 }}
       type="submit" className="mt-[2vw] w-full p-[0.5vw] bg-[#bfc1e9] text-black rounded-lg shadow-lg">
              Submit
            </motion.button>
          </motion.form>
          <button  onClick={() => uploadImages(coverImageFileInputRef)}>
            Upload Cover Image
          </button>
        </motion.main>
      )}
    </motion.main>
  );
};

export default Signup;
