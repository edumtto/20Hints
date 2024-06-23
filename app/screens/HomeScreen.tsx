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
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

const items = [
  { id: '1', title: 'Item 1', icon: 'user' },
  { id: '2', title: 'Item 2', icon: 'navigation' },
  { id: '3', title: 'Item 3', icon: 'octagon' },
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
          title: 'Cards',
          headerRight: () => <View style={styles.createButton}>
            <Button title='New Deck' onPress={handleCreatePress} />
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
        horizontal={true}
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress(item.id)}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Ionicons name={ () => item.icon } size={24} color="black" />
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
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
});

export default HomeScreen