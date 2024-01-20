import { useSession, signIn, signOut } from "next-auth/react"
import Tokens from '../../components/Tokens';
export default function Login() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
       <div>
      <Tokens initialCount={0} email={session.user.email} />
      </div>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}