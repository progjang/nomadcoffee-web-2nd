import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(false);

const httpLink = createUploadLink({
    uri: process.env.MODE_ENV === "production" 
    ? "https://nomadcoffee-bk.herokuapp.com/graphql"
    : "http://localhost:4000/graphql",
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(TOKEN);
    return {
      headers: {
        ...headers,
        ...(token && { token }),
      },
    };
  });

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
}
