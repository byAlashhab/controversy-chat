"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import elon from "../../public/elon.png"
import andrew from "../../public/andrew.png"
import trump from "../../public/trump.png"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

const choiceVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Home() {
  const [choice, setChoice] = useState("")

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full h-screen flex items-center justify-center"
    >
      {choice ? (
        <motion.p
          variants={choiceVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold"
        >
          You chose {choice}!
        </motion.p>
      ) : (
        <div className="flex gap-6">
          {[
            { src: elon, alt: "elon musk", choice: "Elon Musk" },
            { src: andrew, alt: "andrew tate", choice: "Andrew Tate" },
            { src: trump, alt: "donald trump", choice: "Donald Trump" },
          ].map((item, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Image
                className="rounded-lg cursor-pointer shadow-lg"
                src={item.src}
                alt={item.alt}
                width={200}
                height={200}
                onClick={() => setChoice(item.choice)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
