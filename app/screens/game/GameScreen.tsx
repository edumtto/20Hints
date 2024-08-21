import {
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { Stack, useRouter } from "expo-router";
import { createContext, useEffect, useRef, useState } from 'react';
import SetupScreen from './SetupScreen';
import GuessScreen from './GuessScreen';
import ResultScreen, { ResultsScreenProps } from './ResultsScreen';
import { getRandomHintCardIndex, getSecretWord } from '../../card-database-service';
import { SecretWord } from '../../secret-word';

enum GameState {
  Setup, Intro, Guess, Results
}

const GameScreen: React.FC = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState(GameState.Setup)
  const resultRef = useRef<ResultsScreenProps>({isWordGuessed: false, timeSpent: 0, hintsRevealed: 0})


  console.log('Game screen update')

  function setGameSettings(dictionaries: number[], timeLength: number): void {
    setGameState(GameState.Guess)
  }

  function setSuccessGuess(result: ResultsScreenProps): void {
    resultRef.current = result
    setGameState(GameState.Results)
  }

  function setTimeout(): void {

  }

  const Content: React.FC = () => {
    switch (gameState) {
      case GameState.Setup:
        return <SetupScreen setGameSettings={setGameSettings} />
      case GameState.Intro:
        return <View>Intro</View>
      case GameState.Guess:
        const newSecretWord = getSecretWord(Number(getRandomHintCardIndex()))
        return <GuessScreen secretWord={newSecretWord} setSuccessGuess={setSuccessGuess} setTimeout={setTimeout} />
      case GameState.Results:
        return <ResultScreen isWordGuessed={resultRef.current.isWordGuessed} timeSpent={resultRef.current.timeSpent} hintsRevealed={resultRef.current.hintsRevealed}/>
    }
  }

  console.log('Game screen update')
  return <View style={styles.mainContainer}>
    <View style={styles.gameContainer}>
      <Stack.Screen
        options={{
          title: 'Game Setup'
        }}
      />
      <Content />
    </View>
  </View>
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#3E2B77',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  gameContainer: {
    // flex: 1, 
    width: '100%',
    maxWidth: 800,
    marginHorizontal: 'auto',
    backgroundColor: 'white'
  }
})

export default GameScreen;