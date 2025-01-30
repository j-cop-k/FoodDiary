import { Stack } from 'expo-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://oneonta.stepzen.net/api/belligerent-waterbuffalo/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
            'apikey arrahmani::local.net+1000::4428fe428bbf593a38d25d08ec706221324f69ebead78291d28e1875c0ed3f9e'
        },
    });
    
    const RootLayout = () => {
      return (
        <ApolloProvider client={client}>
          <Stack />
        </ApolloProvider>
      );
    };
    
    export default RootLayout;
