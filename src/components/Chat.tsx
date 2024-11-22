"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader, SendIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import elon from "../../public/elon.png";
import andrew from "../../public/andrew.png";
import trump from "../../public/trump.png";
import { twMerge } from "tailwind-merge";
import { ABeeZee } from "next/font/google";
import { Skeleton } from "./ui/skeleton";

const abeeZee = ABeeZee({ weight: "400", subsets: ["latin"] });

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

export type messageType = {
  role: "user" | "assistant";
  content: string;
};

function Chat({
  logout,
  send,
  userImage,
}: {
  logout: () => Promise<void>;
  send: (Type: string, choice: string) => Promise<messageType>;
  userImage: string | null | undefined;
}) {
  const [choice, setChoice] = useState("");
  const [message, setMessage] = useState("");

  const [chatMessages, setChatMessages] = useState<messageType[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    setIsLoading(true);

    try {
      const assistantMessage = await send(message, choice);
      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={twMerge(
        abeeZee.className,
        !choice
          ? "w-full h-screen flex items-center justify-center bg-gray-100"
          : "bg-gray-100"
      )}
    >
      {choice ? (
        <motion.div className="relative w-5/6 md:w-[600px] lg:w-[800px] h-dvh flex flex-col justify-between pt-5 pb-7 mx-auto">
          <Button
            onClick={async () => {
              setLogoutLoading(true);
              logout()
                .then(() => {
                  setLogoutLoading(false);
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            className="absolute top-5 right-6"
            disabled={logoutLoading}
          >
            {logoutLoading ? (
              <Loader className="animate-spin w-5 h-5" />
            ) : (
              "logout"
            )}
          </Button>
          <AnimatePresence>
            {chatMessages.length === 0 && (
              <motion.div
                key={choice}
                className="absolute left-1/2 top-1/2  flex flex-col items-center gap-2"
                initial={{ opacity: 1, translateX: "-50%", translateY: "-50%" }}
                exit={{
                  opacity: 0,
                  translateY: "-100%",
                }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={
                    choice === "Andrew Tate"
                      ? andrew
                      : choice === "Elon Musk"
                      ? elon
                      : trump
                  }
                  alt="landing image"
                  width={90}
                  height={90}
                  className="rounded-full"
                />
                <p className="text-lg font-mono">{choice}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-14 mb-5 flex flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:w-[10px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full px-4">
            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                className={twMerge(
                  "max-w-[60%] w-fit flex gap-4 items-start",
                  message.role == "user"
                    ? "self-end"
                    : "self-start flex-row-reverse"
                )}
                initial={{ y: 10, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.3, type: "spring" },
                }}
              >
                <p className="bg-white rounded-lg py-2 px-4 ">
                  {message.content}
                </p>
                {message.role === "user" ? (
                  <img
                    src={userImage || ""}
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src={
                      choice === "Andrew Tate"
                        ? andrew
                        : choice === "Elon Musk"
                        ? elon
                        : trump
                    }
                    alt="bot icon"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </motion.div>
            ))}
            {loading && (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="w-full pr-6 pl-4">
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { type: "spring" } }}
              className="w-full flex items-center gap-2 p-3 rounded-lg shadow-lg bg-background"
              onSubmit={handleSubmit}
            >
              <Input
                className="w-full"
                placeholder={`Ask ${choice} anything...`}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                disabled={loading}
              />
              <Button size="icon" type="submit" disabled={loading}>
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <SendIcon className="w-5 h-5" />
                )}
              </Button>
            </motion.form>
          </div>
        </motion.div>
      ) : (
        <div className="flex gap-6 px-6">
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
