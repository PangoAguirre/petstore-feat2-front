import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLFormattedError } from "graphql";
import { ServerOffIcon } from "lucide-react";
import { toast } from "sonner";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const handleGraphQLError = ({ message, path }: GraphQLFormattedError) => {
  if (
    path?.includes("registerUser") &&
    message.includes("Ya existe") &&
    message.includes("correo")
  ) {
    toast.error("Correo en uso", {
      description: "El correo electrónico ya está asociado a otra cuenta.",
    });
    return true;
  }

  return false;
};

const httpLink = new HttpLink({
  uri: "http://localhost:8082/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  return {
    headers: {
      ...headers,
      Authorization: session?.jwt ? `Bearer ${session.jwt}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach((err) => {
      if (!handleGraphQLError(err)) {
        console.error(
          `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`,
        );
      }
    });

  if (networkError) {
    toast.error("Can't connect to server", {
      description: networkError.message,
      icon: <ServerOffIcon />,
    });
    console.error(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
