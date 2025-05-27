"use client";

import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";
import { client } from "./client";

// TODO: move to components
export function ApolloProvWrap({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
