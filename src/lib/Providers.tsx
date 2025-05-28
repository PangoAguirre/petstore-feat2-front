"use client";

import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";
import { client } from "./graphql/client";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>{" "}
    </SessionProvider>
  );
}
