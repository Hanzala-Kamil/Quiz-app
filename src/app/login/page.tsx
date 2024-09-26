import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CredentialsSignin } from "next-auth";
import { auth, signIn } from "@/auth";
import Link from "next/link"; // Import Link
import { toast } from "sonner";
import { LoginForm } from "@/components/client/form";
import { redirect } from "next/navigation";
// import { auth } from "@/auth";

const Page = async () => {

  const session = await auth()
  if(session?.user) redirect('/');

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>or</span>
          <form action={async () =>{
            "use server";
            await signIn("google")
          }}>
            <Button type="submit" variant={"outline"}>
              Login With Google
            </Button>
          </form>
          <Link href="/signup">Don't Have an account? Sign Up</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
