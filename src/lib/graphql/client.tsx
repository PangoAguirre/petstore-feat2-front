import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLFormattedError } from "graphql";
import { ServerOffIcon } from "lucide-react";
import { toast } from "sonner";

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
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
