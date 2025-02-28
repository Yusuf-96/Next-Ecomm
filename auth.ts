import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./src/lib/db";
import { signInSchema } from "./src/lib/definitions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/config/auth.config";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { getUserById } from "@/dal/user";
import { getAccountByUserId } from "@/dal/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = await signInSchema.parseAsync(
            credentials
          );

          //get user from prisma db
          const user = await prisma.user.findFirst({
            where: {
              username: username,
            },
          });

          if (!user) {
            return Promise.reject(new Error("User not found"));
          }

          //compare hashed password and entered password are match using bcrypt
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return Promise.reject(new Error("Invalid credentials."));
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return Promise.reject(new Error("Invalid credentials."));
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    
    jwt: async ({ token }) => {
      if(!token.sub) return token
      
      const existingUser = await getUserById(token.sub)

      if(!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)
      
      token.isOauth = !!existingAccount

      return token;
    },
    session: async ({ session, token }) => {
      console.log('Session token:', session)
      session.userId = token.sub
      return session;
    },
  },
});
