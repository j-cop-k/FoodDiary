import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const FoodListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.food.label}</Text>
        <Text style={{ color: 'dimgray' }}>{item.food.nutrients.ENERC_KCAL} call, {item.food.brand}</Text>
      </View>
      <AntDesign name="pluscircleo" size={20} color="blue" />
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
})

export default FoodListItem;