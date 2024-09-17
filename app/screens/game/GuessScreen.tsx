import React, { useRef, useState, memo } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SecretWord, SecretWordCategory } from '../../wordSets/secretWord';
import HintsAndScore from './HintsAndScore';
// import {Dimensions} from 'react-native';
import { GameResultStats, ResultsScreenProps } from './ResultsScreen';
import { levenshteinDistance } from '../../wordDistance';

// Guess screen

interface GuessScreenProps {
  secretWord: SecretWord,
  setSuccessGuess: (ResultsScreenProps) => void,
  setGuessTimeOver: (ResultsScreenProps) => void,
}

const allowedGameTime: number = 120
const hintDisplayTime = 6
const totalNumberOfHints = 20

const GuessScreen: React.FC<GuessScreenProps> = (props) => {
  const [isSuccessGuess, setSuccessGuess] = useState(false)
  // const [inputCloseness, setInputCloseness] = useState(0)
  const timeTrackerRef = useRef(0)
  // const windowHeight = Dimensions.get('window').height
  const hintsRevealed = () => Math.min(1 + Math.floor(timeTrackerRef.current / hintDisplayTime), totalNumberOfHints)
  
  // console.log('Secret word: ' + props.secretWord.word)

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

  function onChangeWordInput(input: string) {
    // setInputCloseness(computeInputCloseness(input))
    if (!isSuccessGuess && input.toUpperCase() == props.secretWord.word.toUpperCase()) {
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

  function computeInputCloseness(input: string) {
    if (input == '') {
      return 0
    }

    const wordLenth = props.secretWord.word.length
    const inputDistance = levenshteinDistance(props.secretWord.word, input)
    console.log(props.secretWord.word + ', ' + input + ' : ' + inputDistance)
    
    if (inputDistance >= wordLenth) {
      return 0
    } else if (inputDistance == 0) {
      return 100
    } else {
      return (wordLenth - inputDistance) * 100 / wordLenth
    }
  }

  const WordInput = () => {
    return <View 
      style={{ flex: 0 }}
    >
      <TextInput
        maxLength={40}
        onChangeText={text => onChangeWordInput(text)}
        placeholderTextColor='grey'
        placeholder='Enter word here'
        style={[styles.wordInput, { color: isSuccessGuess ? 'green' : '#000' }]}
        value={isSuccessGuess ? props.secretWord.word.toUpperCase() : undefined}
        autoFocus={true}
      />
    </View>
  }
    
    
  return <View style={styles.container}>
    <HintsAndScore
      secretWord={props.secretWord}
      isTimerStopped={isSuccessGuess} 
      allowedGameTime={allowedGameTime} 
      hintDisplayTime={hintDisplayTime}
      onTimeUpdate={onTimeUpdate}
    />
    <WordInput />
    {/* <View style={{ height: 2, backgroundColor: 'red', marginHorizontal: 8, width: `${inputCloseness}%` }}></View> */}
    {/* <Text>{inputCloseness}%</Text> */}
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
    fontSize: 32,
    textTransform: 'uppercase',
  }
});

export default GuessScreen;