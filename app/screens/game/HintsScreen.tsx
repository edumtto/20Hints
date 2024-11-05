import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Dimensions, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { SecretWord } from '../../wordSets/secretWord';
import { GameResultStats, ResultsScreenProps } from './ResultsScreen';
import { levenshteinDistance } from '../../wordDistance';
import HintsAndHeader from './HintsAndScore';

const { width, height } = Dimensions.get('window');

// Props Interfaces
interface KeyboardProps {
  onKeyPress: (key: string) => void;
  disabledKeys?: string[];
}

interface HintsScreenProps {
  secretWord: SecretWord;
  onExit: () => void;
  onTimeout: (ResultsScreenProps) => void;
  onSuccessGuess: (ResultsScreenProps) => void;
}

// Component configurations
const KEYBOARD_LAYOUT: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ']
];

const allowedGameTime: number = 10
const hintDisplayTime = 6
const totalNumberOfHints = 20

// Components
const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, disabledKeys = [] }) => {
  return (
    <View style={styles.keyboardContainer}>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.keyboardRow}>
          {row.map((key) => (
            <Pressable
              key={key}
              style={[
                styles.keyButton,
                // disabledKeys.includes(key) && styles.keyButtonDisabled
              ]}
              onPress={() => onKeyPress(key)}
            // disabled={disabledKeys.includes(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

const HintsScreen: React.FC<HintsScreenProps> = (props) => {
  const timeTrackerRef = useRef(0)
  const [guess, setGuess] = useState<string>('');
  const inputClosenessRef = useRef(0) // Interval [0...1]
  const [isSuccessGuess, setSuccessGuess] = useState(false)

  const hintsRevealed = () => Math.min(
    1 + Math.floor(timeTrackerRef.current / hintDisplayTime),
    totalNumberOfHints
  )

  function onTimeUpdate(time: number) {
    timeTrackerRef.current = time
    if (time >= allowedGameTime) {
      const stats: GameResultStats = {
        isWordGuessed: false,
        elapsedTime: timeTrackerRef.current,
        hintsRevealed: hintsRevealed(),
        score: 0
      }
      setTimeout(() => props.onTimeout(stats), 1000);
    }
  }

  function onChangeGuessInput(input: string) {
    const inputUpperCase = input.toUpperCase()
    const wordUpperCase = props.secretWord.word.toUpperCase()

    inputClosenessRef.current = computeInputCloseness(inputUpperCase, wordUpperCase)
    setGuess(input)

    if (!isSuccessGuess && inputUpperCase == wordUpperCase) {
      const stats: GameResultStats = {
        isWordGuessed: true,
        elapsedTime: timeTrackerRef.current,
        hintsRevealed: hintsRevealed(),
        score: totalNumberOfHints - hintsRevealed()
      }
      setSuccessGuess(true)
      setTimeout(() => props.onSuccessGuess(stats), 2000);
    }
  }

  function computeInputCloseness(input: string, word: string) {
    if (input == '') {
      return 0
    }

    const wordLenth = word.length
    const inputDistance = levenshteinDistance(input, word)
    // console.log(props.secretWord.word + ' - ' + input + ' : ' + inputDistance)
    if (inputDistance >= wordLenth) {
      return 0
    } else if (inputDistance == 0) {
      return 1
    } else {
      return (wordLenth - inputDistance) / wordLenth
    }
  }

  const GuessInput = () =>
    <TextInput
      style={[styles.guessInput, { color: isSuccessGuess ? 'green' : '#000' }]}
      value={guess}
      onChangeText={onChangeGuessInput}
      placeholder="Your guess..."
      placeholderTextColor="#bdc3c7"
      maxLength={30}
      // returnKeyType="done"
      // onSubmitEditing={handleSubmitGuess}
      // editable={!isSuccessGuess}
    />

  const handleKeyPress = (key: string): void => {
    const newGuess = guess + key;
    setGuess(newGuess);
    onChangeGuessInput(newGuess)
  };

  const handleClearGuess = (): void => {
    if (guess !== '') {
      let newGuess = guess.slice(0, -1)
      setGuess(newGuess)
      onChangeGuessInput(newGuess)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2c3e50', '#34495e', '#2c3e50']}
        style={styles.gradient}
      >
        <View style={{ flex: 1 }}>
          <HintsAndHeader
            secretWord={props.secretWord}
            isTimerStopped={isSuccessGuess}
            allowedGameTime={allowedGameTime}
            hintDisplayTime={hintDisplayTime}
            onTimeUpdate={onTimeUpdate}
            onExit={props.onExit}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.guessContainer}>
            <GuessInput />
            <Pressable style={styles.backspaceButton} onPress={handleClearGuess}>
              <Feather name="delete" size={24} color="#ecf0f1" />
            </Pressable>
          </View>

          <View style={{ 
            width: inputClosenessRef.current * width, 
            height: 4, 
            backgroundColor: inputClosenessRef.current > 0.7 ? '#3CE8C9' : '#27ae60'
          }}></View>

          <Keyboard
            onKeyPress={handleKeyPress}
          // disabledKeys={usedLetters}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#2c3e50'
  },
  gradient: {
    // flex: 1,
    height: '100%'
  },
  inputContainer: {
    paddingVertical: height * 0.02,
  },
  guessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 14,
  },
  guessInput: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    height: height * 0.06,
    borderRadius: 25,
    paddingHorizontal: width * 0.05,
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
    marginRight: width * 0.02,
  },
  backspaceButton: {
    backgroundColor: '#70748C',
    width: height * 0.06,
    height: height * 0.06,
    borderRadius: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardContainer: {
    alignItems: 'center',
    marginTop: 8
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: height * 0.005,
  },
  keyButton: {
    backgroundColor: '#70748C',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    borderRadius: 10,
    marginHorizontal: width * 0.005,
    minWidth: width * 0.08,
    alignItems: 'center',
  },
  keyButtonDisabled: {
    backgroundColor: '#2c3e50',
    opacity: 0.5,
  },
  keyText: {
    color: '#ecf0f1',
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
  },
});

export default HintsScreen;

// 34495e light gray
// #C7E83C yellow
// #3CE88E green #27ae60
// #3CE8C9 green blue
// #9C3428 brown, #935D57
// #E83C68 pink
// #E86C3C orange
// #70748C light gray