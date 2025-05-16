import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { Dimensions, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Color, Gradient } from '../../uiComponents/Colors';
import levenshteinDistance from '../../util/wordDistance';
import { SecretWord } from '../../wordSets/secretWord';
import HintsAndHeader from './HintsAndTimer';
import { GameResultStats } from './Score';

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

const allowedGameTime: number = 160
const hintDisplayTime = 8
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
              style={({ pressed }) => [styles.keyButton, {opacity:pressed ? 0.5 : 1}]}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

const GuessScreen: React.FC<HintsScreenProps> = (props) => {
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
        secretWord: props.secretWord.word,
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
        secretWord: props.secretWord.word,
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
      editable={false}
    />

  const ClearInputButton = () => 
    <Pressable 
      style={({ pressed }) => [styles.backspaceButton, {opacity:pressed ? 0.5 : 1}]}
      onPress={handleClearGuess}
    >
      <Feather name="delete" size={24} color="#ecf0f1" />
    </Pressable>

  const InputClosenessIndicator = () =>
    <View style={{ 
      width: inputClosenessRef.current * width, 
      height: 4, 
      backgroundColor: inputClosenessRef.current > 0.7 ? '#3CE8C9' : '#27ae60'
    }}></View>
    
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
        colors={Gradient.greyBackground}
        style={styles.gradient}
      >
        <View style={styles.content}>
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
              <ClearInputButton />
            </View>

            <InputClosenessIndicator />

            <Keyboard
              onKeyPress={handleKeyPress}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.grey100,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    margin: 'auto'
  },
  content: {
    height: Platform.OS == 'web' ? height : '100%',
    width: width,
    maxWidth: 800,
  },
  gradient: {
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
    backgroundColor: Color.grey900,
    height: 48,
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
    marginRight: 8,
  },
  backspaceButton: {
    backgroundColor: Color.grey500,
    width: 48,
    height: 48,
    borderRadius: 5,
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
    backgroundColor: Color.grey500,
    paddingHorizontal: Math.min(width * 0.03, 26),
    paddingVertical: height * 0.015,
    borderRadius: 5,
    marginHorizontal: Math.min(width * 0.005, 8),
    // minWidth: width * 0.08,
    alignItems: 'center',
  },
  keyButtonDisabled: {
    backgroundColor: Color.grey100,
    opacity: 0.5,
  },
  keyText: {
    color: Color.grey900,
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
  },
});

export default GuessScreen;