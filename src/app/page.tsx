import Chat, { messageType } from "@/components/Chat";
import { auth, signIn, signOut } from "@/config/auth";
import Google from "../../public/google.png";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  async function logout() {
    "use server";
    await signOut();
  }

  async function send(
    message: string,
    choice: string
  ): Promise<messageType> {
    "use server";

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/openai`, {
      method: "POST",
      body: JSON.stringify({ message, choice }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resDa = await res.json();

    return resDa;
  }

  return (
    <>
      {session?.user ? (
        <Chat logout={logout} send={send} userImage={session.user.image} />
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
          className="absolute inset-0 m-auto w-fit h-fit px-6 py-3 rounded-lg shadow-lg"
        >
          <button
            type="submit"
            className=" border px-4 py-2 rounded-lg flex justify-between items-center gap-4 "
          >
            Sign in with Google
            <Image src={Google} width={40} height={40} alt="google icon" />
          </button>
        </form>
      )}
    </>
  );
}
