import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./src/lib/db";
import { signInSchema } from "./src/lib/definitions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/config/auth.config";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { username, password } = await signInSchema.parseAsync(
            credentials
          );

          //get user from prisma db
          user = await prisma.user.findFirst({
            where: {
              username: username,
            },
          });

          //compare hashed password and entered password are match using bcrypt
          const passwordMatch = await bcrypt.compare(user.password, )


          if (!user) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
});
