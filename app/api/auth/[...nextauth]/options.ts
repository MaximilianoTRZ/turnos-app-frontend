// next-auth-options.ts
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      email: any;
      role?: string;
    };
  }

  interface User {
    role?: string;
  }
}

const adminEmail = "udrealucas@gmail.com";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        console.log("Profile Github: ", profile);

        const userRole = profile.email === adminEmail ? "Admin" : "GitHub User";
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          role: userRole,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      profile(profile) {
        console.log("Profile Google: ", profile);

        const userRole = profile.email === adminEmail ? "Admin" : "Google User";
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: userRole,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
