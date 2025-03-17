import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import getRandomSecretWord from '../../wordSets/secretWordDatabase';
import FinalResultScreen from './FinalScore';
import GuessScreen from './Guess';
import ResultScreen, { GameResultStats } from './Score';

// Enums and Types
enum GameState {
  Guess, Results, FinalResults
}

// Props Interfaces
interface GlobalGameStats {
  gamesPlayed: number
  elapsedTime: number
  globalScore: number
}

interface GameSettings {
  endScore: number
  showClosenessIndicator: boolean
  wordSets: number[]
}

// Screen
const GameScreen: React.FC = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState(GameState.Guess)
  const resultRef = useRef<GameResultStats>({ secretWord: '', isWordGuessed: false, elapsedTime: 0, hintsRevealed: 0, score: 0 })
  const globalStatusRef = useRef<GlobalGameStats>({ gamesPlayed: 0, elapsedTime: 0, globalScore: 0 })
  const gameSettingsRef = useRef<GameSettings>({ endScore: 50, showClosenessIndicator: false, wordSets: [0, 1, 2] })

  const params = useLocalSearchParams<{ endScore: string, showCloseness: string, wordSets: string }>();
  gameSettingsRef.current = { 
    endScore: Number(params.endScore), 
    showClosenessIndicator: params.showCloseness == '1', 
    wordSets: params.wordSets.split(',').map(Number)
  }

  console.log('Game screen update')

  function setSuccessGuess(stats: GameResultStats): void {
    resultRef.current = stats

    const newGlobalStatus: GlobalGameStats = {
      gamesPlayed: globalStatusRef.current.gamesPlayed + 1,
      elapsedTime: globalStatusRef.current.elapsedTime + stats.elapsedTime,
      globalScore: globalStatusRef.current.globalScore + stats.score
    }
    globalStatusRef.current = newGlobalStatus

    if (globalStatusRef.current.globalScore >= gameSettingsRef.current.endScore) {
      setGameState(GameState.FinalResults)
    } else {
      setGameState(GameState.Results)
    }
  }

  function setGuessTimeOver(stats: GameResultStats): void {
    resultRef.current = stats
    
    const newGlobalStatus: GlobalGameStats = {
      gamesPlayed: globalStatusRef.current.gamesPlayed + 1,
      elapsedTime: globalStatusRef.current.elapsedTime + stats.elapsedTime,
      globalScore: globalStatusRef.current.globalScore
    }
    globalStatusRef.current = newGlobalStatus

    setGameState(GameState.Results)
  }

  function setNextGame() {
    setGameState(GameState.Guess)
  }

  function setExit() {
    router.dismissAll()
  }

  const Content: React.FC = () => {
    switch (gameState) {

      case GameState.Guess:
        const newSecretWord = getRandomSecretWord(gameSettingsRef.current.wordSets)
        console.log("word is " + newSecretWord.word)
        return <GuessScreen
          secretWord={newSecretWord}
          onExit={setExit}
          onTimeout={setGuessTimeOver}
          onSuccessGuess={setSuccessGuess}
        />

      case GameState.Results:
        return <ResultScreen
          stats={resultRef.current}
          globalScore={globalStatusRef.current.globalScore}
          endScore={gameSettingsRef.current.endScore}
          setNextGame={setNextGame}
        />

      case GameState.FinalResults:
        return <FinalResultScreen
          gamesPlayed={globalStatusRef.current.gamesPlayed}
          timeSpent={globalStatusRef.current.elapsedTime}
          globalScore={globalStatusRef.current.globalScore}
          endScore={gameSettingsRef.current.endScore}
          setExit={setExit}
        />
    }
  }

  return <View style={styles.mainContainer}>
    <View style={styles.gameContainer}>
      <Stack.Screen
        options={{ title: 'Game Setup' }}  
      />
      <Content />
    </View>
  </View>
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  gameContainer: {
    width: '100%',
    marginHorizontal: 'auto'
  }
})

export default GameScreen;