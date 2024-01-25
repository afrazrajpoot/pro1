"use client";
import React, { useState } from "react";
let arr1 = [5, 4, 3, 2, 1];
const Nav = () => {
  const [arr, setArr] = useState(arr1);

  function updateArray() {
    let arr2 = [...arr].sort((a, b) => a - b);
    setArr(arr2);
    console.log(arr2);
  }
  function descArray() {
    // let arr2 = [...arr].sort((a,b)=>b-a)
    // setArr(arr2)
    // console.log(arr2)
    setArr(arr1);
  }

  return (
    <>
      {[...arr].map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
      <button onClick={updateArray}>click me</button>
     
      <button onClick={descArray}>desc</button>
    </>
  );
};

export default Nav;
