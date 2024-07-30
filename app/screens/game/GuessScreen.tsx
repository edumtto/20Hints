import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useLocalSearchParams } from 'expo-router';
import { getSecretWord, getRandomHintCardIndex } from "../../card-database-service";
import { SecretWord } from '../../secret-word';

interface GuessScreenProps {
  secretWord: SecretWord,
  setSuccessGuess: () => void,
  setTimeout: () => void,
}

// const OpeningGuessScreen: React.FC = () => {
//   return <View style={styles.openingClue}>
//     <Text style={styles.word}>{'The word is a'}</Text>
//     <Text style={styles.word}>{'Place'}</Text>
//   </View>
// }

const GuessScreen: React.FC<GuessScreenProps> = (props) => {
  const [secretWord, _] = useState<SecretWord>(props.secretWord)
  // const [nextHintIndex, setNextHintIndex] = useState<number>(0)

  // useEffect(() => {
  //   const interval = setInterval(revealNextHint, 1000);
  //   return () => clearInterval(interval)
  // })
  

  // function revealNextHint(): void {
  //   setNextHintIndex(nextHintIndex + 1)
  // }

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
        <Text style={styles.word}>{'?'}</Text>
        {/* <Text>The word is </Text>
        <TextInput placeholder='???' style={{ backgroundColor: 'white', padding: 8, borderWidth: 1, borderColor: '#ccc'}}/> */}
      </View>
      { secretWord.hints.map( (hint) => Hint(counter++, hint) )}
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
      borderRadius: 8,
      flex: 1
  },
  openingClue: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  wordContainer: {
    // flex: 1,
    // flexDirection: 'row',
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