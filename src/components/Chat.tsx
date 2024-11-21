"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import elon from "../../public/elon.png";
import andrew from "../../public/andrew.png";
import trump from "../../public/trump.png";
import { useChat } from "ai/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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
};

function Chat({ logout }: { logout: () => Promise<void> }) {
  const [choice, setChoice] = useState("");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  console.log(messages);
  

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={
        !choice ? "w-full h-screen flex items-center justify-center" : ""
      }
    >
      {choice ? (
        <motion.div className="relative w-[600px] h-dvh flex flex-col justify-between pt-5 pb-7 mx-auto">
          <Button onClick={() => logout()} className="absolute top-5 right-0">
            logout
          </Button>
          Your choice {choice}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { type: "spring" } }}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto flex items-center gap-2 p-3 rounded-lg shadow-lg bg-background"
          >
            <Input
              className="w-full"
              placeholder={`Ask ${choice} anything...`}
              onChange={handleInputChange}
              value={input}
            />

            <Button type="submit" size="icon">
              <SendIcon className="w-5 h-5" />
            </Button>
          </motion.form>
        </motion.div>
      ) : (
        <div className="flex gap-6">
          {[
            { src: elon, alt: "elon musk", choice: "Elon Musk" },
            { src: andrew, alt: "andrew tate", choice: "Andrew Tate" },
            { src: trump, alt: "donald trump", choice: "Donald Trump" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                className="rounded-lg cursor-pointer shadow-2xl"
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
  );
}

export default Chat;
