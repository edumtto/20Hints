import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useLocalSearchParams } from 'expo-router';
import { getSecretWord, getRandomHintCardIndex } from "../../card-database-service";
import { SecretWord } from '../../secret-word';
import HintsAndScore from './HintsAndScore';
import {Dimensions} from 'react-native';
import { GameResultStats, ResultsScreenProps } from './ResultsScreen';

// Guess screen

interface GuessScreenProps {
  secretWord: SecretWord,
  setSuccessGuess: (ResultsScreenProps) => void,
  setGuessTimeOver: (ResultsScreenProps) => void,
}

const allowedGameTime: number = 10
const hintDisplayTime = 6
const totalNumberOfHints = 20

const GuessScreen: React.FC<GuessScreenProps> = (props) => {
  const [isSuccessGuess, setSuccessGuess] = useState(false)
  const timeTrackerRef = useRef(0)
  const windowHeight = Dimensions.get('window').height
  const hintsRevealed = () => Math.min(1 + Math.floor(timeTrackerRef.current / hintDisplayTime), totalNumberOfHints)
  console.log('Guess screen update')

  function onTimeUpdate(time: number) {
    timeTrackerRef.current = time
    if (time >= allowedGameTime) {
      const stats: GameResultStats = {
        isWordGuessed: false, 
        timeSpent: timeTrackerRef.current, 
        hintsRevealed: hintsRevealed(),
        score: 0
      }
      setTimeout(() => props.setGuessTimeOver(stats), 1000);
    }
  }

  function onChangeWordInput(text: string) {
    if (!isSuccessGuess && text.toLowerCase() == props.secretWord.word.toLowerCase()) {
      const stats: GameResultStats = {
        isWordGuessed: true, 
        timeSpent: timeTrackerRef.current, 
        hintsRevealed: hintsRevealed(),
        score: totalNumberOfHints - hintsRevealed()
      }
      setSuccessGuess(true)
      setTimeout(() => props.setSuccessGuess(stats), 2000);
    }
  }

  const WordInput = () => 
    <TextInput
      maxLength={40}
      onChangeText={text => onChangeWordInput(text)}
      placeholder='Enter with the word here'
      style={[styles.wordInput, { color: isSuccessGuess ? 'green' : '#000' }]}
      value={isSuccessGuess ? props.secretWord.word : undefined}
      autoFocus={true}
    />

  return <View style={styles.container}>
    <HintsAndScore 
      secretWord={props.secretWord} 
      isTimerStopped={isSuccessGuess} 
      allowedGameTime={allowedGameTime} 
      hintDisplayTime={hintDisplayTime}
      onTimeUpdate={onTimeUpdate}
    />
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
    fontFamily: 'monospace',
    fontSize: 32
  }
});

export default GuessScreen;