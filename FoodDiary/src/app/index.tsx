import { Link } from 'expo-router';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, ActivityIndicator } from 'react-native';
import FoodListItem from '../components/FoodListItem';
import { useState } from 'react';
import { Alert } from 'react-native';
import { gql, useQuery } from '@apollo/client'

const query = gql`
  query search($date: Date!, $user_id: String!) {
    search(date: $date, user_id: $user_id) {
      food_id
      user_id
      created_at
      label
      kcal
      id
    }
  }
`;

const foodItems = [
  { label: "Pizza", cal: 60, brand: 'Dominos' },
  { label: "lol", cal: 50, brand: 'lpl' },
  { label: "kawa", cal: 11150, brand: 'costamcostam' },
  { label: "Pizza", cal: 60, brand: 'Dominos' },


]

export default function SEarchScreen() {
  const [search, setSearch] = useState('');

  const {data, loading, error } = useQuery(query, { variables: { ingr: "Pizza" } })

  const performSearch = () => {
    //console.warn('Searching for:', search);
    Alert.alert(
      "Twoje zapytanie", // Tytuł alertu
      `Searching for: ${search}`, // Wiadomość w alert)
    )

    setSearch('');
  }

  if (loading) {
    return <ActivityIndicator />;
  }
  
  if (error) {
    console.log("wystapil blad", error); // Logowanie błędu
    return <Text>Something went wrong. Please try again.</Text>;
  }
  
  
  console.log(JSON.stringify(data, null, 2));

  return (
    <View style={styles.container}>
      <TextInput value={search}
        onChangeText={setSearch}
        placeholder="szukaj"
        style={styles.input}
      />
      {search && <Button title="Search" onPress={performSearch} />}

      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
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
  }
});
