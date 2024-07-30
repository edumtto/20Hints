import {
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { Stack, useRouter } from "expo-router";
import { createContext, useState } from 'react';
import SetupScreen from './SetupScreen';
import GuessScreen from './GuessScreen';
import ResultScreen from './ResultsScreen';
import { getRandomHintCardIndex, getSecretWord } from '../../card-database-service';
import { SecretWord } from '../../secret-word';

enum GameState {
  Setup, Intro, Guess, Results
}

const GameScreen: React.FC = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState(GameState.Setup)
        
  function setGameSettings(dictionaries: number[], timeLength: number): void {
    setGameState(GameState.Guess)
  }

  function setSuccessGuess(): void {
    setGameState(GameState.Results)
  }

  function setTimeout(): void {

  }

  const Content: React.FC = () => {
    switch (gameState) {
      case GameState.Setup:
        return <SetupScreen setGameSettings={setGameSettings}/>
      case GameState.Intro:
        return <View>Intro</View>
      case GameState.Guess:
        const newSecretWord = getSecretWord(Number(getRandomHintCardIndex()))
        return <GuessScreen secretWord={newSecretWord} setSuccessGuess={setSuccessGuess} setTimeout={setTimeout}/>
      case GameState.Results:
        return <ResultScreen />
    }
  }

  return <View>
    <Stack.Screen
        options={{
          title: 'Game Setup'
        }}
      />
      <Content />
  </View>
}

export default GameScreen;