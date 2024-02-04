"use client";

import { createContext, useContext, useState } from "react";


const MyContext = createContext();
const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState([]);
 
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
