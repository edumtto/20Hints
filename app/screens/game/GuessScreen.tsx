import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useLocalSearchParams } from 'expo-router';
import { getSecretWord, getRandomHintCardIndex } from "../../card-database-service";
import { SecretWord } from '../../secret-word';

// const OpeningGuessScreen: React.FC = () => {
//   return <View style={styles.openingClue}>
//     <Text style={styles.word}>{'The word is a'}</Text>
//     <Text style={styles.word}>{'Place'}</Text>
//   </View>
// }

// Timer component

interface TimerProps {
  time: number
}

const TimerView: React.FC<TimerProps> = (props) => {
  return <Text style={{ padding: 8, fontSize: 22 }}>{props.time}</Text>
}

// Hint component

interface HintProps {
  number: number
  hint: string
}

const Hint: React.FC<HintProps> = (props) => {
  return <View style={styles.hintContainer}>
    <Text style={styles.hintNumber}>{props.number}</Text>
    <Text style={styles.hintText}>{props.hint}</Text> 
  </View>
}

// Guess screen

interface GuessScreenProps {
  secretWord: SecretWord,
  setSuccessGuess: () => void,
  setTimeout: () => void,
}

const GuessScreen: React.FC<GuessScreenProps> = (props) => {
  const [secretWord, _] = useState<SecretWord>(props.secretWord)
  const [time, setTime] = useState<number>(0) // in seconds
  const allowedGameTime = 60
  const hintDisplayTime = 2

  useEffect(() => {
    console.log('use effect called')
    const interval = setInterval(() => {
      if (time < allowedGameTime) {
        setTime(i => i + 1)
      } else {
        clearInterval(interval)
      }
    } , 1000);
  },[])

  console.log('Guess screen update')

  const HintViews = () => {
    const numberOfHintsDisplayed = Math.min(Math.floor(time / hintDisplayTime), props.secretWord.hints.length)
    let counter = 1

    return secretWord.hints
      .slice(0,numberOfHintsDisplayed)
      .map( (hint) => <Hint key={counter} number={counter++} hint={hint}/> )
  }

  return <ScrollView>
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <TimerView time={time}/>
        <Text style={styles.word}>{'?'}</Text>
        {/* <Text>The word is </Text>
        <TextInput placeholder='???' style={{ backgroundColor: 'white', padding: 8, borderWidth: 1, borderColor: '#ccc'}}/> */}
      </View>
      <HintViews />
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