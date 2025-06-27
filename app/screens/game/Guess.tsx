import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Color, Gradient } from '../../uiComponents/Colors';
import levenshteinDistance from '../../util/wordDistance';
import { SecretWord } from '../../wordSets/secretWord';
import HintsAndHeader from './HintsAndTimer';
import { GameResultStats } from './Score';
import Constants from '../../uiComponents/Constants';

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
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const allowedGameTime: number = 160
const hintDisplayTime = 8
const totalNumberOfHints = 20

// Components
const VirtualKeyboard: React.FC<KeyboardProps> = ({ onKeyPress, disabledKeys = [] }) => {
  return (
    <View style={styles.keyboardContainer}>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.keyboardRow}>
          {row.map((key) => (
            <Pressable
              key={key}
              style={({ pressed }) => [styles.keyButton, { opacity: pressed ? 0.5 : 1 }]}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <View key={3} style={styles.keyboardRow}>
        <Pressable
          key={'space'}
          style={({ pressed }) => [styles.spaceButton, { opacity: pressed ? 0.5 : 1 }]}
          onPress={() => onKeyPress(' ')}
        >
          <Text style={styles.keyText}>{' '}</Text>
        </Pressable>
      </View>

    </View>
  );
};

// InputClosenessIndicator now takes closeness as a prop
interface InputClosenessIndicatorProps {
  closeness: number;
}
const InputClosenessIndicator: React.FC<InputClosenessIndicatorProps> = ({ closeness }) =>
  <View style={{
    width: `${closeness * 100}%`,
    height: 4,
    borderRadius: 5,
    backgroundColor: closeness > 0.7 ? '#3CE8C9' : '#27ae60'
  }}></View>

// GuessInput moved outside GuessScreen to avoid recreation on every render
interface GuessInputProps {
  guess: string;
  isSuccessGuess: boolean;
  onChangeGuessInput: (input: string) => void;
  inputRef?: React.RefObject<TextInput>;
  closeness: number;
}

const GuessInput: React.FC<GuessInputProps> = ({ guess, isSuccessGuess, onChangeGuessInput, inputRef, closeness }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.guessInputContainer}>
        <TextInput
          ref={inputRef}
          style={[
            styles.guessInput,
            {
              color: isSuccessGuess ? 'green' : '#000',
              textTransform: 'uppercase'
            }
          ]}
          value={guess}
          onChangeText={onChangeGuessInput}
          placeholder="Your guess..."
          placeholderTextColor="#bdc3c7"
          maxLength={30}
          autoFocus={true}
          autoCapitalize="characters"
          onBlur={() => {
            if (!isSuccessGuess) {
              inputRef?.current?.focus();
            }
          }}
          editable={!isSuccessGuess}
        />
        <InputClosenessIndicator closeness={closeness} />
      </View>
    );
  }

  // For mobile devices
  return (
    <View style={styles.guessInputContainer}>
      <TextInput
        ref={inputRef}
        style={[
          styles.guessInput,
          {
            color: isSuccessGuess ? 'green' : '#000',
            textTransform: 'uppercase'
          }
        ]}
        value={guess}
        onChangeText={onChangeGuessInput}
        placeholder="Your guess..."
        placeholderTextColor="#bdc3c7"
        maxLength={30}
        editable={!isSuccessGuess}
        autoCapitalize="characters"
        keyboardType='ascii-capable'
        autoCorrect={false}
      />
      <InputClosenessIndicator closeness={closeness} />
    </View>
  );
};

const GuessScreen: React.FC<HintsScreenProps> = (props) => {
  const timeTrackerRef = useRef(0)
  const [guess, setGuess] = useState<string>('');
  const [closeness, setCloseness] = useState(0); // new state for closeness
  const [isSuccessGuess, setSuccessGuess] = useState(false)
  const inputRef = useRef<TextInput>(null);
  const [showKeyboard, setShowKeyboard] = useState(Platform.OS !== 'web');

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

    const newCloseness = computeInputCloseness(inputUpperCase, wordUpperCase)
    setCloseness(newCloseness)
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

  const ClearInputButton = () =>
    <Pressable
      style={({ pressed }) => [styles.backspaceButton, { opacity: pressed ? 0.5 : 1 }]}
      onPress={handleClearGuess}
    >
      <Feather name="delete" size={24} color="#ecf0f1" />
    </Pressable>

  const handleKeyPress = (key: string): void => {
    if (isSuccessGuess)
      return;
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

  const KeyboardToggle = () => {
    if (Platform.OS !== 'web') return null;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.keyboardToggle,
          { opacity: pressed ? 0.5 : 1 }
        ]}
        onPress={() => setShowKeyboard(!showKeyboard)}
      >
        <Feather
          name={showKeyboard ? "chevron-down" : "chevron-up"}
          size={24}
          color={Color.grey800}
        />
      </Pressable>
    );
  };

  if (Platform.OS === 'web') {
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
                <GuessInput
                  guess={guess}
                  isSuccessGuess={isSuccessGuess}
                  onChangeGuessInput={onChangeGuessInput}
                  inputRef={inputRef}
                  closeness={closeness}
                />
                <ClearInputButton />
              </View>

              <KeyboardToggle />

              {showKeyboard && (
                <VirtualKeyboard
                  onKeyPress={handleKeyPress}
                />
              )}
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView  
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
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
                <GuessInput
                  guess={guess}
                  isSuccessGuess={isSuccessGuess}
                  onChangeGuessInput={onChangeGuessInput}
                  inputRef={inputRef}
                  closeness={closeness}
                />
              </View>
            </View>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )

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
    maxWidth: Constants.maxWidth,
  },
  gradient: {
    height: '100%'
  },
  inputContainer: {
    paddingVertical: height * 0.02,
    paddingHorizontal: Platform.OS === 'web' ? width * 0.05 : 8
  },
  guessContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 2,
  },
  guessInputContainer: {
    flex: 1,
    gap: 2,
  },
  guessInput: {
    backgroundColor: Color.grey900,
    height: 48,
    borderRadius: 5,
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
    paddingHorizontal: 16,
  },
  backspaceButton: {
    backgroundColor: Color.grey500,
    width: 48,
    height: 48,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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
  spaceButton: {
    width: Math.min(width, Constants.maxWidth) * 0.45,
    backgroundColor: Color.grey500,
    paddingHorizontal: Math.min(width * 0.03, 26),
    paddingVertical: height * 0.015,
    borderRadius: 5,
    marginHorizontal: Math.min(width * 0.005, 8),
    alignItems: 'center',
  },
  keyboardToggle: {
    borderColor: Color.grey500,
    borderWidth: 1,
    width: 100,
    height: 28,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
});

export default GuessScreen;