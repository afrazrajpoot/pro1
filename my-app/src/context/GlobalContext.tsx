"use client";

import { createContext, useContext, useState } from "react";


const MyContext = createContext();
const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<string>("");
 function tokenInLocal(token:any):any{
if(token){
  localStorage.setItem("token",JSON.stringify(token));
setState(token)
}
else{
  return "";
}
 }
 function removeToken(){
  localStorage.removeItem("token");
  setState("")
 }
  return (
    <MyContext.Provider value={{ tokenInLocal,removeToken,state }}>
      {children}
    </MyContext.Provider>
  );
};
export function useGlobalState() {
  const context = useContext(MyContext);
  return context;
}
export default GlobalContext;
