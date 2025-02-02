import { View, Text, StyleSheet, Pressable, Alert  } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { gql, useMutation } from '@apollo/client';

// const FoodLogListItem = ({ item }) => {
//   console.log(item)
//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1, gap: 5 }}>
//         <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.label}</Text>
//         <Text style={{ color: 'dimgray' }}>{item.kcal} cal</Text>
//       </View>
      
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

// export default FoodLogListItem;

//zmiany przed gramatura
// element z usuwaniem
// const DELETE_MUTATION = gql`
//   mutation DeleteFood(
//     $id: Int!, 
//     $food_id: String!, 
//     $kcal: Int!, 
//     $label: String!, 
//     $user_id: String!, 
//     $created_at: DateTime!
//   ) {
//     deleteFood_log(
//       id: $id, 
//       food_id: $food_id, 
//       kcal: $kcal, 
//       label: $label, 
//       user_id: $user_id, 
//       created_at: $created_at
//     ) {
//       id
//     }
//   }
// `;


// const FoodLogListItem = ({ item, refetch }) => {
//   const [deleteFood] = useMutation(DELETE_MUTATION);

//   const onDeletePressed = async () => {
//     Alert.alert(
//       "Delete meal", 
//       `Are you sure you want to delete "${item.label}" from your today's food list?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { 
//           text: "Delete", 
//           style: "destructive", 
//           onPress: async () => {
//             try {
//               await deleteFood({
//                 variables: {
//                   id: item.id,
//                   food_id: item.food_id, 
//                   kcal: item.kcal,
//                   label: item.label,
//                   user_id: item.user_id,
//                   created_at: item.created_at,
//                 }
//               });
//               refetch(); // 🔥 Odśwież dane po usunięciu
//             } catch (err) {
//               console.error("Błąd usuwania:", err);
//             }
//           }
//         }
//       ]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1, gap: 5 }}>
//         <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.label}</Text>
//         <Text style={{ color: 'dimgray' }}>{item.kcal} cal</Text>
//       </View>

//       {/* 🔥 Dodany przycisk usuwania */}
//       <Pressable onPress={onDeletePressed}>
//         <AntDesign name="delete" size={20} color="red" />
//       </Pressable>
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
// });

// export default FoodLogListItem;


//gramatura
const DELETE_MUTATION = gql`
  mutation DeleteFood(
    $id: Int!, 
    $food_id: String!, 
    $kcal: Int!, 
    $label: String!, 
    $user_id: String!, 
    $grams: Int!,  
    $created_at: DateTime!
  ) {
    deleteFood_log(
      id: $id, 
      food_id: $food_id, 
      kcal: $kcal, 
      label: $label, 
      user_id: $user_id, 
      grams: $grams, 
      created_at: $created_at
    ) {
      id
    }
  }
`;

const FoodLogListItem = ({ item, refetch }) => {
  const [deleteFood] = useMutation(DELETE_MUTATION);

  const onDeletePressed = async () => {
    Alert.alert(
      "Usuń posiłek", 
      `Czy na pewno chcesz usunąć "${item.label}" (${item.grams}g)?`, // ✅ Wyświetlanie gramatury w alertach
      [
        { text: "Anuluj", style: "cancel" },
        { 
          text: "Usuń", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteFood({
                variables: {
                  id: item.id,
                  food_id: item.food_id, 
                  kcal: item.kcal,
                  label: item.label,
                  user_id: item.user_id,
                  grams: item.grams, // ✅ Wysyłanie gramatury do mutacji
                  created_at: item.created_at,
                }
              });
              refetch(); // 🔥 Odświeżenie danych po usunięciu
            } catch (err) {
              console.error("Błąd usuwania:", err);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.label}</Text>
        <Text style={{ color: 'dimgray' }}>
          {item.kcal} kcal ({item.grams} g) {/* ✅ Dodano gramaturę */}
        </Text>
      </View>

      {/* ✅ Przycisk usuwania */}
      <Pressable onPress={onDeletePressed}>
        <AntDesign name="delete" size={20} color="red" />
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
});

export default FoodLogListItem;
