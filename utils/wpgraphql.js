import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://atenews.ph/graphql/',
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default client;
