import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    jwt?: string;
    user: {
      id: string;
      email: string;
      name?: string;
    };
  }

  interface User {
    email: string;
    name?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: stirng;
    email: string;
    name?: string;
    jwt?: string;
  }
}
