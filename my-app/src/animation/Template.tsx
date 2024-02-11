// app/template.tsx
"use client"
import { AnimatePresence,motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>

    <motion.main
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
          y: -50,
          
        },
        pageAnimate: {
          opacity: 1,
           x: 0,
          y: 0,
        },
      }}
      transition={{
        duration: 0.5,
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5 },
      }}
      >
      {children}
    </motion.main>
        </AnimatePresence>
  )
}