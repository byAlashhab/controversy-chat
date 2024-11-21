import { signIn } from '@/config/auth'


export default function Signin() {
  return (
    <form
    action={async () => {
      "use server"
      await signIn("google")
    }}
  >
    <button type="submit">Signin with Google</button>
  </form>
  )
}
