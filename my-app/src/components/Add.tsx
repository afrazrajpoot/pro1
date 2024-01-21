"use client";
import React, { memo, useState } from "react";

const Add = () => {
  const [num, setNum] = useState<number>(0);
  let arr = [];
  for (let i = 1; i < num; i++) {
    arr.push(i);
  }
  return (
    <>
      <h1 className="bg-red-500">{num}</h1>
      <hr />
      <button onClick={() => setNum(num + 1)}>click me</button>
      {arr
        ?.filter((elem) => {
          return elem % 2 === 0;
        })
        .map((elem) => (
          <p key={elem}>{elem}</p>
        ))}
    </>
  );
};

export default memo(Add);
