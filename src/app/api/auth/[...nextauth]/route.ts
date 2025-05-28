import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const loginClient = new ApolloClient({
  uri: "http://localhost:8082/graphql",
  cache: new InMemoryCache(),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "jwt",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const { data, errors } = await loginClient.mutate({
            mutation: gql`
              mutation Login($password: String = "", $email: String = "") {
                login(password: $password, email: $email)
              }
            `,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          const res: string = data.login;

          if (errors || !res) return null;

          console.log("res:", res);
          if (res.includes("Error")) {
            throw new Error(res.substring(6).trimStart());
          }

          const jwt = jwtDecode<{
            sub: string;
            iat: number;
            exp: number;
          }>(res);

          return {
            id: jwt.sub,
            email: jwt.sub,
            token: res,
          };
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.token; // your JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.name = token.name;
      session.jwt = token.jwt;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
