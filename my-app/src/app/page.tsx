'use client'
import Nav from "@/components/Nav"

import {motion} from "framer-motion"

const page = () => {
  
  return (
    <motion.main className="h-[100vh] w-[100vw] flex justify-center items-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <Nav />
  
    <h1>Bhatti</h1>
    </motion.main>
  )
}

export default page
