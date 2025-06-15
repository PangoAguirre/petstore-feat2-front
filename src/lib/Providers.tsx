"use client";

import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";
import { client } from "./graphql/client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={new QueryClient()}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
