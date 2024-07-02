import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

enum CardCategory {
  Person, Place, Thing
}

const items = [
  { id: '1', title: 'Mickey Mouse', category: CardCategory.Person },
  { id: '2', title: 'Sacramento', category: CardCategory.Place },
  { id: '3', title: 'Baseball Bat', category: CardCategory.Thing },
  { id: '4', title: 'Shakira', category: CardCategory.Person },
  { id: '5', title: 'Mars', category: CardCategory.Place },
  { id: '6', title: 'Eraser', category: CardCategory.Thing },
  // Add more items as needed
];

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  // const navigation = useNavigation();
  const router = useRouter();

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemPress = (id: string) => {
    // navigation.navigate('screens/DetailScreen', { itemId: id });
    router.push({ pathname: `screens/DetailScreen`, params: { itemId: id } })
  };

  const handleCreatePress = () => {
    // navigation.navigate('screens/CreateScreen');
    router.push('screens/CreateScreen')
  };

  function CategoryIcon(category: CardCategory): React.JSX.Element {
    switch (category) {
      case CardCategory.Person:
        return <FontAwesome6 name='face-grin-wide' size={18} color='black' />
      case CardCategory.Place:
        return <FontAwesome6 name='location-dot' size={18} color='black' />
      case CardCategory.Thing:
        return <FontAwesome6 name='cube' size={18} color='black' />
    }
  }

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
    },
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 50,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    createButton: {
      paddingHorizontal: 16,
    },
    createButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    searchBar: {
      height: 40,
      borderColor: '#bbb',
      borderWidth: 1,
      borderRadius: 6,
      margin: 10,
      paddingHorizontal: 10,
      color: search != '' ? '#000' : '#aaa',
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      margin: 8,
      borderColor: "#eee",
      backgroundColor: '#fff',
      borderWidth: 1,
      borderRadius: 8
    },
    itemTitle: {
      fontSize: 16,
    },
    iconText: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    }
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Played Cards',
          headerRight: () => <View style={styles.createButton}>
            <Button title='Pick Card' onPress={handleCreatePress} />
          </View>
        }}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress(item.id)}
          >
            <View style={styles.iconText}>
              {CategoryIcon(item.category)}
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            <Text>10 hints revealed</Text>

          </TouchableOpacity>
        )}
      />

    </View>
  );
};

export default HomeScreen