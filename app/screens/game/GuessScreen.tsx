import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useLocalSearchParams } from 'expo-router';
import { getSecretWord, getRandomHintCardIndex } from "../../card-database-service";
import { SecretWord } from '../../secret-word';
import HintsAndScore from './HintsAndScore';
import {Dimensions} from 'react-native';

// const OpeningGuessScreen: React.FC = () => {
//   return <View style={styles.openingClue}>
//     <Text style={styles.word}>{'The word is a'}</Text>
//     <Text style={styles.word}>{'Place'}</Text>
//   </View>
// }



// Guess screen

interface GuessScreenProps {
  secretWord: SecretWord,
  setSuccessGuess: () => void,
  setTimeout: () => void,
}

const GuessScreen: React.FC<GuessScreenProps> = (props) => {
  const [secretWord, _] = useState<SecretWord>(props.secretWord)
  const [isSuccessGuess, setSuccessGuess] = useState(false)
  const windowHeight = Dimensions.get('window').height

  console.log('Guess screen update')

  const WordInput = () => 
    <TextInput
      editable
      maxLength={40}
      onChangeText={text => onChangeWordInput(text)}
      placeholder='Enter with the word here'
      style={[styles.wordInput, { color: isSuccessGuess ? 'green' : '#000' }]}
      value={isSuccessGuess ? props.secretWord.word : undefined}
      autoFocus={true}
    />

  function onChangeWordInput(text: string) {
    if (!isSuccessGuess && text.toLowerCase() == secretWord.word.toLowerCase()) {
      console.log("YOU WON!")
      setSuccessGuess(true)
      setTimeout(() => {
        props.setSuccessGuess()
    }, 2000);
    }
  }

  return <View style={styles.container}>
    <HintsAndScore secretWord={secretWord} isTimerStopped={isSuccessGuess}/>
    <WordInput />
  </View>
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      padding: 12,
      margin: 16,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
  },
  openingClue: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  wordInput: {
    height: 48,
    bottom: 16,
    right: 16,
    left: 16,
    backgroundColor: '#fff',
    borderColor: '#aaa',
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 800,
    fontFamily: 'monospace'
  }
});

export default GuessScreen;