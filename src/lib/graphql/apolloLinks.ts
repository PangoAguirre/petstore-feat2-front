import { HttpLink } from "@apollo/client";

export const serviceLinks = {
  auth: new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}:8081/graphql` // to test on local
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/graphql`,
  }),
  suppliers: new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}:8082/graphql` // to test on local
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/supplier/graphql`,
  }),
};
