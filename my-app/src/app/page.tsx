"use client";
import { formData, formObj } from "@/appData/data";
import { useGlobalState } from "@/context/GlobalContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

const LazyLoadedComponent = dynamic(() => import("@/components/Add"), {
  loading: () => <h1>loadingoapifpaoif</h1>,
});
const page = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const { setState } = useGlobalState();

  const handleData = useCallback(
    function (e: any) {
      let name = e.target.name;
      let value = e.target.value;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [data, setData]
  );
  function submitData(e: any) {
    e.preventDefault();
    setState((prev) => [...prev, data]);
    router.push("/about");
  }
  return (
    <>
      <Header title="home page" content="this is home page" />
      <h1>main page</h1>
      <LazyLoadedComponent />
      <form
        onSubmit={submitData}
        className="bg-blue-200 p-4 flex flex-col w-full max-w-[30vw] flex-wrap gap-4 justify-center rounded-md shadow m-auto md:bg-red-200"
      >
        {formData?.map((elem, i) => (
          <input
            type={elem.type}
            name={elem.name}
            placeholder={elem.placeholder}
            value={elem.value}
            className="p-2 rounded-md shadow-md text-center  md:placeholder:text-red-400 text-[1rem] md:placeholder:text-[0.9rem] w-full placeholder:text-[3vw]"
            onChange={handleData}
            key={i}
          />
        ))}
      </form>

      <Link href={"/about/about2"}>
        <button className="bg-red-200 p-3 rounded-md shadow-lg absolute top-[0] text-vw transform translate-y-[6vw]">
          About
        </button>
      </Link>
    </>
  );
};

export default page;
