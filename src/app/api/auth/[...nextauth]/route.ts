import { ApolloClient, ApolloError, gql, InMemoryCache } from "@apollo/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { GetUserIdDocument, LoginDocument } from "@/lib/graphql/codegen";

const loginClient = new ApolloClient({
  uri: `${process.env.BACKEND_URL}:8081/graphql`,
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
            mutation: LoginDocument,
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

          const { data: userData } = await loginClient.query({
            query: GetUserIdDocument,
            variables: {
              email: credentials.email,
            },
          });

          return {
            id: userData.getUserByEmail.id,
            email: jwt.sub,
            token: res,
          };
        } catch (err) {
          if (err instanceof ApolloError) {
            if (err.networkError) {
              throw new Error("No es posible contactar con el servidor");
            }
          }
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
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
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
