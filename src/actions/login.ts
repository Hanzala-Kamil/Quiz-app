"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const loginCredential = async (email:string,password:string) => {

    // const email = formData.get("email") as string | undefined;
    // const password = formData.get("password") as string | undefined;
    // if (!password || !email) throw new Error("Please fill all fields");
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      const err = error as CredentialsSignin;
      return err.cause;
    }
  };

  export {
    loginCredential
  }