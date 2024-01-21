"use client";
import { arr } from "@/appData/data";
import Header from "@/components/Header";
import { useGlobalState } from "@/context/GlobalContext";
import Link from "next/link";
const page = () => {
  const { state } = useGlobalState();
  return (
    <>
  <Header  title="About page" content="this is about page"/>

      <div
        className={
          state.username === "Afraz"
            ? "h-[100vh] bg-green-200 animate-pulse"
            : "bg-red-200 animate-bounce"
        }
      >
        <h1 className="sticky top-0  bg-black">about page</h1>
        <hr />

        {state.length > 0 ? (
          state?.map((elem: any, i: number) => {
            return (
              <div
                key={i}
                className="p-2 bg-blue-500 shadow-xl rounded-md animate-bounce mt-[5vw]"
              >
                <h1 className="font-bold text-black"> {elem.username}</h1>
                <p>{elem.username}</p>
                <p>{elem.email}</p>
              </div>
            );
          })
        ) : (
          <h1 className="p-4 bg-blue-500 shadow-xl rounded-md animate-bounce mt-[5vw]">
            no any user
          </h1>
        )}
      </div>
      <Link href={"/"}>
        <button className="bg-red-200 p-3 rounded-md shadow-lg">
          Home page
        </button>
      </Link>
    </>
  );
};
export default page;
