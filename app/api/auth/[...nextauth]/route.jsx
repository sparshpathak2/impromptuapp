import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { compare } from 'bcrypt';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials
                // console.log("Credentials:", credentials);
                try {
                    await connectToDB()
                    const user = await User.findOne({ email })

                    // console.log("User found:", user);

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await compare(password, user.password);

                    // console.log("Password match:", passwordMatch);

                    if (!passwordMatch) {
                        return null;
                        // return new Response({message: "Invalid email or password."}, { status: 400 })
                    }

                    return user;
                } catch (error) {
                    console.log("This is the credentials server side error: ", error)
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user?.email
            })

            session.user.id = sessionUser?._id.toString();

            return session;
        },

        // async signIn({ profile }) {
        //     try {
        //         await connectToDB();


        //         console.log("Provider details", profile?.provider)
        //         //check if a user already exists
        //         const userExists = await User.findOne({
        //             email: profile.email
        //         })

        //         // If not, create new user
        //         if (!userExists) {
        //             await User.create({
        //                 email: profile.email,
        //                 username: profile.name.replace(" ", "").toLowerCase(),
        //                 image: profile.picture
        //             })
        //         }
        //         return true;

        //     } catch (error) {
        //         console.error("Error creating user during social sign-in:", error);
        //         // You can also return an error object to NextAuth for handling
        //         return null;
        //     }
        // }

        async signIn({ profile }) {
            try {
              await connectToDB();

            //   if (profile?.provider === "google") {
              if (profile?.iss === "https://accounts.google.com") {
                const userExists = await User.findOne({ email: profile.email });
          
                if (!userExists) {
                  // Create a new user for social sign-in
                  await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture,
                    // Add other relevant user properties based on your model
                  });
                }
              } else {
                // User signed in using credentials provider, don't create a new user
                console.log("User signed in with credentials provider. Skipping user creation.");
              }
          
              return true;
            } catch (error) {
              console.error("Error creating user during social sign-in:", error);
              return null;
            }
          }


    }
})

export { handler as GET, handler as POST };