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

  console.log('Game screen update')
        
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

  console.log('Game screen update')
  return <View style={styles.container}>
    <Stack.Screen
        options={{
          title: 'Game Setup'
        }}
      />
      <Content />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    // maxWidth: 800,
    // marginHorizontal: 'auto',
    backgroundColor: '#3E2B77'
  }
})

export default GameScreen;