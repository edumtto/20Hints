import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Enums and Types
export enum CategoryType {
  Place = 'Place',
  Person = 'Person',
  Thing = 'Thing'
}

interface CategoryIconConfig {
  iconPath: keyof typeof Feather.glyphMap;
  iconColor: string;
}

type CategoryIconConfigMap = {
  [key in CategoryType]: CategoryIconConfig;
};

// Props Interfaces
interface CategoryIconProps {
  category: CategoryType;
}

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  disabledKeys?: string[];
}

interface GameHintsScreenProps {
  category: CategoryType;
  hints: string[];
  onExit: () => void;
  onGuess: (guess: string) => void;
}

// Component configurations
const CATEGORY_CONFIGS: CategoryIconConfigMap = {
  [CategoryType.Place]: {
    iconPath: 'map-pin',
    iconColor: '#1abc9c'
  },
  [CategoryType.Person]: {
    iconPath: 'user',
    iconColor: '#e67e22'
  },
  [CategoryType.Thing]: {
    iconPath: 'box',
    iconColor: '#9b59b6'
  }
};

const KEYBOARD_LAYOUT: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

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
                disabledKeys.includes(key) && styles.keyButtonDisabled
              ]}
              onPress={() => onKeyPress(key)}
              disabled={disabledKeys.includes(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const HintsScreen2: React.FC<GameHintsScreenProps> = ({
  category,
  hints,
  onExit,
  onGuess
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (key: string): void => {
    const newGuess = guess + key;
    setGuess(newGuess);
    setUsedLetters(prev => [...prev, key]);
  };

  const handleSubmitGuess = (): void => {
    if (guess.trim()) {
      onGuess(guess.trim());
      setGuess('');
      setUsedLetters([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2c3e50', '#34495e', '#2c3e50']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
          </View>
          <View style={styles.categoryContainer}>
            <CategoryIcon category={category} />
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          <TouchableOpacity onPress={onExit} style={styles.exitButton}>
            <Feather name="x" size={24} color="#ecf0f1" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.hintsContainer}>
          {hints.map((hint, index) => (
            <Text key={index} style={styles.hintText}>
              {index + 1}. {hint}
            </Text>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.guessContainer}>
            <TextInput
              style={styles.guessInput}
              value={guess}
              onChangeText={setGuess}
              placeholder="Your guess..."
              placeholderTextColor="#bdc3c7"
              maxLength={20}
              returnKeyType="done"
              onSubmitEditing={handleSubmitGuess}
            />
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitGuess}
            >
              <Feather name="check" size={24} color="#ecf0f1" />
            </TouchableOpacity>
          </View>
          <Keyboard 
            onKeyPress={handleKeyPress}
            disabledKeys={usedLetters}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  gradient: {
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

export default HintsScreen2;