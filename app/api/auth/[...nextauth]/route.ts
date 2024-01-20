import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { connection, entities } from "@database";
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
    
  ],
  secret: process.env.SECRET,
  
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (profile) {
        try {

          const client = await connection.getInstance();
          const userRepository = client.getRepository(entities.User);
          

          const existing = await  userRepository.findOne({ where : { email: profile?.email}}); 
          console.log('Existing user' + existing);
          if(!existing){
            const user = new entities.User();

          user.name =profile?.name;
          user.email= profile?.email;
          user.tokens=3;
          user.activated= true;
          const result = await userRepository.save(
           user
          );
         }
        } catch (error) {
          console.error("Error saving user to database:", error);
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
