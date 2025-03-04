import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://cmyp37vc53jlbv5wa3nrnez6mi0dktla.lambda-url.eu-central-1.on.aws/",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "X-Api-Key": "da2-gcyvktbwpfhnznbpdaghdbyf7m",
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
