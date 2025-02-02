import { View,
   Text, 
   StyleSheet,
   TextInput,
  Pressable,
Alert 
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import {gql, useMutation} from '@apollo/client'
import { useRouter } from 'expo-router';
import { useState } from 'react';

//zmiana przed gramatura

// const mutation = gql`
// mutation MyMutation (
// $food_id: String!, 
// $kcal: Int!, 
// $label: String!, 
// $user_id: String!
// ){
//   insertFood_log(
//   food_id: $food_id, 
//   kcal: $kcal, 
//   label: $label, 
//   user_id: $user_id
//   ) {
//     created_at
//     food_id
//     id
//     kcal
//     label
//     user_id
//   }
// }
// `


// const FoodListItem = ({ item }) => {
//   const [logFood,{data, loading, error}]=useMutation(mutation, {refetchQueries:['foodLogsForDate']});
// const router = useRouter();

// const onPlusPressed= async ()=>{
//   await logFood({
//     variables:{
//         food_id: item.food.foodId,
//         kcal: item.food.nutrients.ENERC_KCAL,
//         label: item.food.label,
//         user_id: "jakubK"
//   }});
//   router.back();
// };

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1, gap: 5 }}>
//         <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.food.label}</Text>
//         <Text style={{ color: 'dimgray' }}>{item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}</Text>
//       </View>
//       <AntDesign onPress={onPlusPressed} name="pluscircleo" size={20} color='#6699ff' />
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f6f6f8',
//     padding: 10,
//     borderRadius: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// })

// export default FoodListItem;


// gramatura
const mutation = gql`
mutation MyMutation(
  $food_id: String!,
  $kcal: Int!,
  $label: String!,
  $user_id: String!,
  $grams: Int!
) {
  insertFood_log(
    food_id: $food_id,
    kcal: $kcal,
    label: $label,
    user_id: $user_id,
    grams: $grams
  ) {
    id
    food_id
    kcal
    label
    user_id
    grams
    created_at
  }
}
`;

const FoodListItem = ({ item }) => {
  const router = useRouter();
  const [logFood] = useMutation(mutation);
  const [grams, setGrams] = useState(""); // ✅ Przechowuje gramaturę jako string

  const kcal_per_100g = item.food.nutrients.ENERC_KCAL; // ✅ Pobranie kalorii na 100g
  const parsedGrams = Number(grams) || 0; // ✅ Konwersja string -> number
  const calculatedKcal = Math.round((kcal_per_100g * parsedGrams) / 100); // ✅ Przeliczanie kalorii

  // ✅ Debugowanie wartości
  console.log("🔹 kcal_per_100g:", kcal_per_100g);
  console.log("🔹 Wpisana gramatura:", grams);
  console.log("🔹 parsedGrams:", parsedGrams);
  console.log("🔹 Obliczone kcal:", calculatedKcal);

  const onPlusPressed = async () => {
    console.log("🔹 Przycisk + został naciśnięty");

    if (!grams || parsedGrams <= 0) { // ✅ Walidacja wartości gramatury
      Alert.alert("Błąd", "Podaj prawidłową gramaturę!");
      return;
    }

    try {
      const response = await logFood({
        variables: {
          food_id: item.food.foodId,
          kcal: calculatedKcal,
          label: item.food.label,
          user_id: "jakubK",
          grams: parsedGrams,
        },
      });

      console.log("✅ Odpowiedź z mutacji:", response);

      router.back(); // ✅ Powrót do ekranu głównego po dodaniu
    } catch (error) {
      console.error("❌ Błąd podczas dodawania posiłku:", error);
      Alert.alert("Błąd", "Nie udało się dodać posiłku. Spróbuj ponownie.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.food.label}</Text>
        <Text style={{ color: 'dimgray' }}>
          {kcal_per_100g} kcal / 100g
        </Text>
      </View>

      {/* ✅ Input do wpisywania gramatury */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="g"
        value={grams}
        onChangeText={setGrams}
      />

      {/* ✅ Przycisk dodawania */}
      <Pressable onPress={onPlusPressed}>
        <AntDesign name="pluscircleo" size={20} color="blue" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f8',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    borderRadius: 5,
    width: 50,
    textAlign: 'center',
  },
});

export default FoodListItem;