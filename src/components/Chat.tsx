import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SendIcon } from "lucide-react";

function Chat({ choice }: { choice: string }) {
  return (
    <motion.div className="relative w-screen h-dvh flex flex-col justify-between p-7">
      Your choice {choice}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { type: "spring" } }}
        action=""
        className="w-full max-w-2xl mx-auto flex items-center gap-2 p-3 rounded-lg shadow-lg bg-background"
      >
        <Input
          className="w-full"
          placeholder={`Ask ${choice} anything...`}
        />

        <Button type="submit" size="icon">
          <SendIcon className="w-5 h-5"/>
        </Button>
      </motion.form>
    </motion.div>
  );
}

export default Chat;
