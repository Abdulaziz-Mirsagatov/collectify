import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorize } from "./services/actions/auth/authorize";
import { CredentialsInteface } from "./app/api/auth/[...nextauth]/types";
import { USER_ROLES } from "./constants/users";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials.username || !credentials.password) return null;

        const res = await authorize({
          username: credentials.username,
          password: credentials.password,
        } as CredentialsInteface);

        if (!res.ok) return null;

        const user = await res.json();
        if (!user) return null;

        return {
          ...user,
          role: user.role ?? USER_ROLES.USER,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role;
      return token;
    },
    session: async ({ session, token }) => {
      session.user.role = token.role as USER_ROLES;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
