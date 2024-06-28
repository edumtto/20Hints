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
  { id: '1', title: 'Item 1', category: CardCategory.Person },
  { id: '2', title: 'Item 2', category: CardCategory.Place },
  { id: '3', title: 'Item 3', category: CardCategory.Thing },
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

  function CategoryIcon (category: CardCategory): React.JSX.Element {
    switch (category) {
      case CardCategory.Person: 
        return <FontAwesome6 name='face-grin-wide'  size={24} color='black' />
      case CardCategory.Place: 
        return <FontAwesome6 name='location-dot'  size={24} color='black' />
      case CardCategory.Thing: 
        return <FontAwesome6 name='cube'  size={24} color='black' />
    }
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.navBar}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={handleCreatePress} style={styles.createButton}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View> */}
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress(item.id)}
          >
            <View style={styles.iconText}>
              { CategoryIcon(item.category) }
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            <Text>10 hints revealed</Text>
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    // backgroundColor: '#007bff',
    paddingHorizontal: 16,
    // borderRadius: 5,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    margin: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    backgroundColor: '#ccc',
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 8
  },
  itemTitle: {
    fontSize: 18,
  },
  iconText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }
});

export default HomeScreen