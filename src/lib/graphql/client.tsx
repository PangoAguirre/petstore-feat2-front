import { ApolloClient, InMemoryCache, from, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLFormattedError } from "graphql";
import { ServerOffIcon } from "lucide-react";
import { toast } from "sonner";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { serviceLinks } from "./apolloLinks";

// use on or another based on serviceName from context
const httpLink = new ApolloLink((op, fw) => {
  const { serviceName } = op.getContext();
  if (serviceName in serviceLinks) {
    return serviceLinks[serviceName as keyof typeof serviceLinks].request(
      op,
      fw,
    );
  }

  console.warn(`No link found for ${serviceName}. Using default one: 'auth'.`);
  return serviceLinks.auth.request(op, fw);
});

// set Bearer on every req
const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  return {
    headers: {
      ...headers,
      Authorization: session?.jwt ? `Bearer ${session.jwt}` : "",
    },
  };
});

// --------------------------------------------------------
// -------------------- Error handling --------------------
// --------------------------------------------------------
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

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
