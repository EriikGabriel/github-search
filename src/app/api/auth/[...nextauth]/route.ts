import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GitHubProvider from "next-auth/providers/github"

export const OPTIONS: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user, session, account }) {
      return { ...token, ...user, ...session, ...account }
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
}

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST }
