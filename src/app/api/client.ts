import axios from "axios";

export const restClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}:8081`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
});
