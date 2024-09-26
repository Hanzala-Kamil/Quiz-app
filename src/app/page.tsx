import { auth } from "@/auth";
import Image from "next/image";
import {decode,encode} from "next-auth/jwt"
import { cookies } from "next/headers";
import Navbar from "@/components/ui/navbar";

export default async function Home() {

  const session = await auth()
  const user = session?.user;
  // console.log('Home -> user' , user)

  // docode the cookie token
  // const cookee = cookies().get('authjs.session-token')
  // console.log(await decode({
  //   token:cookee?.value!,
  //   salt:cookee?.name!,
  //   secret:process.env.AUTH_SECRET!,
  // }))

  return (
    <>
    <Navbar/>
    <h1 className="text-center font-bold my-6">Welcome to Quizz App</h1>
    </>
  );
}
