import { Stack } from 'expo-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://arrahmani.eu-central-a.ibm.stepzen.net/api/hasty-hare/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'apikey arrahmani::local.net+1000::4428fe428bbf593a38d25d08ec706221324f69ebead78291d28e1875c0ed3f9e',
  },
});

const RootLayout = () => {
    return (
        <ApolloProvider client={client}>
          <Stack screenOptions={{ headerShown: true }}> {/* ✅ Włączono nagłówki */}
            <Stack.Screen name="index" options={{ title: "My Feed" }} /> {/* ✅ Zmieniona nazwa ekranu głównego */}
            <Stack.Screen name="search" options={{ title: "Search Food" }} /> {/* ✅ Zmieniona nazwa ekranu wyszukiwania */}
          </Stack>
        </ApolloProvider>
  );
};

export default RootLayout;