// import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "./models/userModel";
// import { compare } from "bcryptjs";
// import { connectToDatabase } from "./lib/utils";
// import { threadId } from "worker_threads";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_ID_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       authorize: async (credentials) => {
//         const email = credentials.email as string | undefined;
//         const password = credentials.password as string | undefined;

//         if (!email || !password)
//           throw new CredentialsSignin("Plese provide bothEmail and Password");

//         // connection with database here
//         await connectToDatabase();

//         const user = await User.findOne({ email }).select("+password");

//         if (!user) throw new CredentialsSignin({cause:"Invalid Email or Password"});
//         if (!user.password)
//           throw new CredentialsSignin({cause:"Invalid Email or Password"});

//         const isMatch = await compare(password, user.password);
//         if (!isMatch) throw new CredentialsSignin({cause:"Invalid Email or Password"});

//         return { name: user.name, email: user.email, id: user._id };
//       },
//     }),
//   ],
//   pages:{
//     signIn: '/login',
//   },
//   // callbacks: {
//   //   signIn: async ({user,account,profile,email}) =>{
//   //       if(account?.provider === 'google'){
//   //         try{
//   //           const {email,name,image,id} = user;
//   //           await connectToDatabase();
//   //           const alReadyUser = await User.findOne({email})
//   //           if(!alReadyUser) await User.create({email,name,googleId:id});
//   //           return true;
//   //         }catch(error){
//   //           throw new AuthError("Error while creating user");
//   //         }

//   //       }
//   //       return false;
//   //   }
//   // },
// });

import NextAuth, {CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_ID_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin("Please provide both Email and Password");

        // Use absolute URL for API calls
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          throw new CredentialsSignin("Invalid credentials");
        }

        const user = await res.json();

        if (!user) throw new CredentialsSignin({ cause: "Invalid Email or Password" });

        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new CredentialsSignin({ cause: "Invalid Email or Password" });

        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

