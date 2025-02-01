import { View, 
  Text,
   FlatList, 
   Pressable, 
   Button, 
   StyleSheet,
    ActivityIndicator,
    TextInput 
   } from 'react-native';
import { Link } from 'expo-router';
import { gql, useQuery } from '@apollo/client'
//import FoodListItem from '../components/FoodListItem';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import FoodLogListItem from '../components/FoodLogListItem';
import { useState } from 'react';


const query = gql`
query foodLogsForDate($date: Date!, $user_id: String!) {
  foodLogsForDate(date: $date, user_id: $user_id) {
    created_at
    food_id
    user_id
    label
    id
    kcal
  }
}
`;

// const foodItems = [
//   {
//     food: { label: "Pizza", nutrients: { ENERC_KCAL: 100 }, brand: 'Dominos' }
//   },
//   {
//     food: { label: "Pizza", nutrients: { ENERC_KCAL: 100 }, brand: 'Dominos' }
//   },
// ];

//3:09 problem z wyswietlaniem tablicy

dayjs.extend(utc); // Aktywacja pluginu

export default function HomeScreen() {
  const user_id = 'jakubK';
  const [dailyCaloriesGoal, setDailyCaloriesGoal] = useState(2000);//ustawianie dziennego celu kalorycznego



  const { data, loading, error, refetch  } = useQuery(query, {
    variables: {
      date: dayjs().format('YYYY-MM-DD'),
      user_id,

    },
  });

  // liczenie dziennych kalorii
  const totalConsumedCalories = data?.foodLogsForDate?.reduce((sum, item) => sum + item.kcal, 0) || 0;
  const remainingCalories = dailyCaloriesGoal - totalConsumedCalories;


  console.log(data)



  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch data</Text>;
  }


  return (
    <View style={styles.container}>
{/* wyswietlanie kalorii */}

      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Daily calories goal</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={dailyCaloriesGoal.toString()}
          onChangeText={(text) => {
            const numericValue = parseInt(text) || 0;
            setDailyCaloriesGoal(numericValue);
          }}
        />
        <Text>{dailyCaloriesGoal} - {totalConsumedCalories} = {remainingCalories}</Text>
      </View>




      <View style={styles.headerRow} >
        <Text style={styles.subtitle}>Today's food</Text>
        {/* <Link href="/search">
        <Button title="ADD FOOD" /> */}
        <Link href="/search" asChild>
          <Pressable style={{ backgroundColor: '#6699ff', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>ADD FOOD</Text>
          </Pressable>
        </Link>
      </View>


      {/* <FlatList
        data={data.foodLogsForDate}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <FoodLogListItem item={item} />}
      /> */}
<FlatList
  data={data?.foodLogsForDate || []}
  contentContainerStyle={{ gap: 5 }}
  renderItem={({ item }) => <FoodLogListItem item={item} refetch={refetch} />}
/>




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    gap: 10
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
    color: 'dimgray'
  },

  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    width: 80,
    textAlign: 'center',
  }

})

// npg_XP6sxwT8FdWz tutuajajajaja

// import { View, Text, FlatList, Pressable, Button, StyleSheet, ActivityIndicator } from 'react-native';
// import { Link, useFocusEffect } from 'expo-router';
// import { gql, useQuery } from '@apollo/client';
// import { useCallback } from 'react';
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import FoodLogListItem from '../components/FoodLogListItem';

// const query = gql`
// query MyQuery($date: Date!, $user_id: String!) {
//   foodLogsForDate(date: $date, user_id: $user_id) {
//     created_at
//     food_id
//     user_id
//     label
//     id
//     kcal
//   }
// }
// `;

// dayjs.extend(utc); // Aktywacja pluginu

// export default function HomeScreen() {
//   const user_id = 'jakubK';
//   const { data, loading, error, refetch } = useQuery(query, {
//     variables: {
//       date: dayjs().format('YYYY-MM-DD'),
//       user_id,
//     },
//   });

//   // 🔄 Odświeżanie danych przy powrocie na ekran główny
//   useFocusEffect(
//     useCallback(() => {
//       refetch(); // Pobranie najnowszych danych
//     }, [])
//   );

//   console.log("Aktualne dane:", data);

//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   if (error) {
//     return <Text>Failed to fetch data</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerRow}>
//         <Text style={styles.subtitle}>Calories</Text>
//         <Text>1334 - 34 = 344</Text>
//       </View>

//       <View style={styles.headerRow}>
//         <Text style={styles.subtitle}>Today's food</Text>
//         <Link href="/search" asChild>
//           <Pressable style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
//             <Text style={{ color: 'white', fontWeight: 'bold' }}>ADD FOOD</Text>
//           </Pressable>
//         </Link>
//       </View>

//       <FlatList
//         data={data?.foodLogsForDate || []}
//         contentContainerStyle={{ gap: 5 }}
//         renderItem={({ item }) => <FoodLogListItem item={item} />}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//     padding: 10,
//     gap: 10,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: '500',
//     flex: 1,
//     color: 'dimgray',
//   },
// });
