import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useLocalSearchParams } from 'expo-router';
import { getHintCard } from '../card-database-service';


const GuessScreen: React.FC = () => {
  const { hintCardIndex } = useLocalSearchParams<{ hintCardIndex: string }>()
  const hintCard = getHintCard(Number(hintCardIndex))

  const Hint = (number: number, hint: string) => {
    const [isHidden, setIsHidden] = useState(true);
    return <TouchableOpacity key={number} style={styles.hintContainer} onPress={() => setIsHidden(!isHidden)}>
      <Text style={styles.hintNumber}>{number}</Text>
      <Text style={styles.hintText}>{isHidden ? '': hint}</Text> 
    </TouchableOpacity>
  }

  let counter = 1

  return <ScrollView>
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <Text style={styles.word}>{hintCard.word}</Text>
        {/* <Text>The word is </Text>
        <TextInput placeholder='???' style={{ backgroundColor: 'white', padding: 8, borderWidth: 1, borderColor: '#ccc'}}/> */}
      </View>
      { hintCard.hints.map( (hint) => Hint(counter++, hint) )}
    </View>
  </ScrollView>
}

const styles = StyleSheet.create({
  container: {
      width: "100%",
      maxWidth: 800,
      marginHorizontal: 'auto',
      backgroundColor: '#fff',
      padding: 12,
      margin: 16,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8
  },
  wordContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
  },
  word: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    textAlign: 'center',
    padding: 24,
    fontSize: 24
  },
  hintContainer: {
    flex: 1,
    flexDirection: 'row',
    padding:4,
  },
  hintNumber: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#aaa',
    borderWidth: 1,
    textAlign: 'center',
    alignContent: 'center'
  },
  hintText: {
    alignContent: 'center',
    paddingLeft: 8,
    // backgroundColor: 'gray'
  }
});

export default GuessScreen