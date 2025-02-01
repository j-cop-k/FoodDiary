import { Link } from 'expo-router';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
   Text, 
   View, 
   FlatList, 
   TextInput,
    Button, 
    ActivityIndicator,
  Pressable } from 'react-native';
import FoodListItem from '../components/FoodListItem';
import { useState } from 'react';
import { Alert } from 'react-native';
import { gql, useLazyQuery } from '@apollo/client'

const query = gql`
query search($ingr: String) {
  search(ingr: $ingr) {
    hints {
      food {
        label
        brand
        foodId
        nutrients {
          ENERC_KCAL
        }
      }
    }
  }
}
`;


export default function SEarchScreen() {
  const [search, setSearch] = useState('');

  const [runSearch, { data, loading, error }] = useLazyQuery(query);

  const performSearch = () => {
    runSearch({ variables: { ingr: search } });
    //setSearch('');
  }

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  if (error) {
    console.log("wystapil blad", error); // Logowanie błędu
    return <Text>Something went wrong. Please try again.</Text>;
  }


  const items = data?.search?.hints || [];

  return (
    <View style={styles.container}>
      <TextInput value={search}
        onChangeText={setSearch}
        placeholder="szukaj"
        style={styles.input}
      />
      {/* {search && <Button title="Search" onPress={performSearch} />} */}

      {search && (
  <Pressable style={styles.button} onPress={performSearch}>
    <Text style={styles.buttonText}>SEARCH</Text>
  </Pressable>
)}

      {loading && <ActivityIndicator />}
      <FlatList
        data={items}
        renderItem={({ item }) => <FoodListItem item={item} />}
        ListEmptyComponent={() => <Text>Search a food</Text>} //tekst ktory sie wyswiwtla zanim wyszukasz cokolwiek
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#6699ff', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
  },
});
