"use client";

import { createContext, useContext, useState } from "react";

// import { createContext } from "react"

// interface MyContextType {

//   setValue: React.Dispatch<React.SetStateAction<string>>;
// }

const MyContext = createContext();
const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState([]);
  // function getData (data){
  //   setState(data)
  // }
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
export function useGlobalState() {
  const context = useContext(MyContext);
  return context;
}
export default GlobalContext;
