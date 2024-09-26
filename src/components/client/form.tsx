"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import credentials from "next-auth/providers/credentials";
import { loginCredential } from "@/actions/login";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!password || !email) return toast.error("Please fill all fields");

        // console.log("loginHandler -> email" , email)

        const toastId = toast.loading("Logging In");

        const error = await loginCredential(email, password);
        if (!error)
        {
          toast.success("Login Successfully", {
            id: toastId,
          });
          router.refresh();
        }
        else {
          toast.error(String(error), {
            id: toastId,
          });
        }
      }}
      className="flex flex-col gap-4"
    >
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export { LoginForm };
