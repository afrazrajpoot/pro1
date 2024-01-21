"use client"
import { formData } from '@/appData/data'
import Link from 'next/link'
import React from 'react'

const Cards = () => {
    
  return (
    <>
      <section className='bg-slate-200  h-[100vh] grid grid-cols-4 place-items-center place-content-center'>
        {
            formData?.map((data)=>{
                return(
                    <div className=' bg-blue-300 p-[2vw] shadow-lg rounded-md w-[200px] h-[200px]  hover:bg-blue-300 hover:opacity-25 transition  duration-[0.3s] hover:cursor-pointer '>
                        <h1>{data.name}</h1>
                        <h1>{data.type}</h1>
                        <h1>{data.placeholder}</h1>
                    </div>
                )
            })
        }
           <Link href={"/"}>
        <button className="bg-red-200 p-3 rounded-md shadow-lg">
          Home page
        </button>
      </Link>
      </section>
   
    </>
  )
}

export default Cards
