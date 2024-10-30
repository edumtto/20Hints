import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { SecretWord, SecretWordCategory } from '../../wordSets/secretWord';
import { GameResultStats, ResultsScreenProps } from './ResultsScreen';
import { levenshteinDistance } from '../../wordDistance';

const { width, height } = Dimensions.get('window');

// Enums and Types
interface CategoryIconConfig {
  iconPath: keyof typeof Feather.glyphMap;
  iconColor: string;
}

type CategoryIconConfigMap = {
  [key in SecretWordCategory]: CategoryIconConfig;
};

// Props Interfaces
interface CategoryIconProps {
  category: SecretWordCategory;
}

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
const CATEGORY_CONFIGS: CategoryIconConfigMap = {
  [SecretWordCategory.Place]: {
    iconPath: 'map-pin',
    iconColor: '#1abc9c'
  },
  [SecretWordCategory.Person]: {
    iconPath: 'user',
    iconColor: '#e67e22'
  },
  [SecretWordCategory.Thing]: {
    iconPath: 'box',
    iconColor: '#9b59b6'
  }
};

const KEYBOARD_LAYOUT: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ']
];

const allowedGameTime: number = 120
const hintDisplayTime = 6
const totalNumberOfHints = 20

// Components
const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  const config = CATEGORY_CONFIGS[category] ?? {
    iconPath: 'help-circle',
    iconColor: '#bdc3c7'
  };

  return (
    <Feather 
      name={config.iconPath} 
      size={24} 
      color={config.iconColor} 
    />
  );
};

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, disabledKeys = [] }) => {
  return (
    <View style={styles.keyboardContainer}>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.keyboardRow}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.keyButton,
                // disabledKeys.includes(key) && styles.keyButtonDisabled
              ]}
              onPress={() => onKeyPress(key)}
              // disabled={disabledKeys.includes(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const HintsScreen: React.FC<HintsScreenProps> = (props) => {
  const timeTrackerRef = useRef(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const inputClosenessRef = useRef(0)
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
    console.log(props.secretWord.word + ' - ' + input + ' : ' + inputDistance)
    if (inputDistance >= wordLenth) {
      return 0
    } else if (inputDistance == 0) {
      return 100
    } else {
      return (wordLenth - inputDistance) * 100 / wordLenth
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
      editable={!isSuccessGuess}
    />

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (key: string): void => {
    const newGuess = guess + key;
    setGuess(newGuess);
    onChangeGuessInput(newGuess)
  };

  // const handleSubmitGuess = (): void => {
  //   if (guess.trim()) {
  //     onGuess(guess.trim());
  //     setGuess('');
  //     setUsedLetters([]);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2c3e50', '#34495e', '#2c3e50']}
        style={styles.gradient}
      >
        <View style={styles.header}>

          <TouchableOpacity onPress={props.onExit} style={styles.exitButton}>
            <Feather name="x" size={24} color="#ecf0f1" />
          </TouchableOpacity>

          <View style={styles.categoryContainer}>
            <CategoryIcon category={props.secretWord.category} />
            <Text style={styles.categoryText}>{props.secretWord.category}</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
          </View>
          
        </View>

        <ScrollView style={styles.hintsContainer}>
          {/* {props.secretWord.hints.map((hint, index) => (
            <Text key={index} style={styles.hintText}>
              {index + 1}. {hint}
            </Text>
          ))} */}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.guessContainer}>
            <GuessInput />
            {/* <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitGuess}
            >
              <Feather name="check" size={24} color="#ecf0f1" />
            </TouchableOpacity> */}
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  timeContainer: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 15,
  },
  timeText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    fontSize: Math.min(height * 0.025, 18),
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 15,
  },
  categoryText: {
    color: '#ecf0f1',
    marginLeft: width * 0.02,
    fontSize: Math.min(height * 0.025, 18),
  },
  exitButton: {
    padding: width * 0.02,
  },
  hintsContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  hintText: {
    color: '#ecf0f1',
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
    marginVertical: height * 0.01,
  },
  inputContainer: {
    paddingVertical: height * 0.02,
  },
  guessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
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
  submitButton: {
    backgroundColor: '#27ae60',
    width: height * 0.06,
    height: height * 0.06,
    borderRadius: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardContainer: {
    alignItems: 'center',
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: height * 0.005,
  },
  keyButton: {
    backgroundColor: '#34495e',
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