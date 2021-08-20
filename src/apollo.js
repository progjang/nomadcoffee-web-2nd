import { ApolloClient, InMemoryCache, makeVar, createHttpLink } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(false);

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://nomadcoffee-bk.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        token: localStorage.getItem(TOKEN),
      },
    };
  });
  
  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          keyFields: (obj) => `User:${obj.username}`,
        },
      },
    }),
  });

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
}
