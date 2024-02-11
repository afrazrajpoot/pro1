'use client'
import axios from "axios"

export const formMutation =async (data:any)=>{
const resp = await axios.post("http://localhost:8000/api/v1/registerUser",data,{withCredentials:true})
return resp.data
}
export const loginMutation = async (data:any)=>{
    const resp = await axios.post("http://localhost:8000/api/v1/login",data,{withCredentials:true})
    return resp.data
}