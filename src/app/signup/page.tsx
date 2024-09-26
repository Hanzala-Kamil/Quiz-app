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
import Link from "next/link"; // Import Link
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/utils";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              "use server";

              const name = formData.get("name") as string | undefined;
              const email = formData.get("email") as string | undefined;
              const password = formData.get("password") as string | undefined;

              if (!name || !password || !email)
                throw new Error("Please fill all fields");

              // connect datadase here
              await connectToDatabase();

              const user = await User.findOne({ email });
              if (user) throw new Error("Email already exists");

              const hashedPassword = await hash(password, 10);

              // create new user
              await User.create({
                name,
                email,
                password: hashedPassword,
              });
              // redirect to login page
              redirect("/login");
            }}
            className="flex flex-col gap-4"
          >
            <Input placeholder="Name" name="name" />
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>or</span>
          <form action="">
            <Button type="submit" variant={"outline"}>
              Login With Google
            </Button>
          </form>
          <Link href="/login">Already Have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
