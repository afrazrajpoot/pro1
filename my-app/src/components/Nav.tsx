"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
const Nav = () => {
  const [isAnimate, setAnimate] = useState<boolean>(false);
  let boxVariant = {
    lion: {
      x: 100,
      scale: 1.5,
      backgroundColor: "indigo",
    },
    Afraz: {
      x: 1000,
      scale: 0.4,
      backgroundColor: "green",
    },
  };
  let boxVariant1={
    hidden:{
      x:"-100vw"
    },
    visible:{
      x:0,
      transition:{
      delay:0.5,
      when:"beforeChildren"
      }
    }
  }
  let lisVariant ={
    hidden:{
      x:-10,
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      staggerChildren:0.2
    }
  }
  return (
    <motion.div className="p-[2vw] m-[20px] ">
      <motion.div
        animate={{
          // x: isAnimate ? "70rem" : 0,
          opacity: isAnimate ? 1 : 0.5,
          backgroundColor: isAnimate ? "yellow" : "",
          rotate: isAnimate ? 360 : 0,
        }}
        initial={{ opacity: 0.1, backgroundColor: "green" }}
        transition={{ type: "spring", stiffness: 60,delay:0.1 }}
        className="bg-red-200 h-[200px] w-[200px]"
      >
        box
      </motion.div>

      <Button onClick={() => setAnimate(!isAnimate)}>click</Button>
      <motion.div 
        drag="x"
        whileHover={{ scale: 1.1  }}
        whileTap={{ scale: 0.9 }}
        className="bg-red-200 h-[200px] w-[200px]"
      >
        box ek to mene api bhi call kerwai h
      </motion.div>
      {/* <motion.div
        variants={boxVariant}
        animate="Afraz"
        initial="lion"
        transition={{ type: "spring", stiffness: 60 }}
        className="bg-red-200 h-[200px] w-[200px]"
      >
        box
      </motion.div> */}


      <motion.div
        className="bg-red-200  h-[200px] w-[200px] flex flex-col items-center"
        variants={boxVariant1}
        initial="hidden"
        animate="visible"
        transition={{ type: "spring", stiffness: 60 }}
      >
        {[1, 2, 3].map((box, index) => (
          <motion.div
            key={index}
            className="bg-red-50  h-[50px] w-[50px] m-[10px]"
           variants={lisVariant}
          >
            {box}
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="bg-red-200  h-[200px] w-[200px] flex flex-col items-center mt-[2vw]"
        variants={boxVariant1}
        
        animate={{scale: [1,1.4,1.4,1,1],borderRadius:["20%","20%","50%","50%","20%"],rotate:[0,0,270,270,0]}}
        transition={{ duration:2 }}
      >
      box4
      </motion.div>
     <Link href={'/signup'}> <Button>click</Button></Link>
    </motion.div>
  );
};

export default Nav;
