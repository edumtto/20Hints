import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from 'react';
import GuessScreen from './GuessScreen';
import HintsScreen from './HintsScreen';
import ResultScreen, { GameResultStats } from './ResultsScreen';
import { getRandomSecretWord } from '../../wordSets/secretWordDatabase';
import FinalResultScreen from './FinalResultsScreen';
import GameSettingsScreen, { WordSets } from './Setup';
import HintsScreen2, { CategoryType } from './HintsScreen2';

enum GameState {
  Setup, Intro, Guess, Results, FinalResults
}

interface GlobalGameSettings {
  endScore: number
}

interface GlobalGameStats {
  gamesPlayed: number
  elapsedTime: number
  globalScore: number
}

interface GameSettings {
  endScore: number
  showClosenessIndicator: boolean
  wordSets: WordSets
}

// GAME SCREEN

const GameScreen: React.FC = () => {
  const defaultGameSettings: GameSettings = {
    endScore: 50,
    showClosenessIndicator: false,
    wordSets: {
      Places: true,
      Things: true,
      People: true,
      Animals: false,
      Food: false,
      Sports: false
    }
  }

  const router = useRouter();
  const [gameState, setGameState] = useState(GameState.Setup)
  const globalStatusRef = useRef<GlobalGameStats>({ gamesPlayed: 0, elapsedTime: 0, globalScore: 0 })
  const resultRef = useRef<GameResultStats>({ isWordGuessed: false, elapsedTime: 0, hintsRevealed: 0, score: 0 })
  const gameSettingsRef = useRef<GameSettings>(defaultGameSettings)


  console.log('Game screen update')

  function setGameSettings(endScore: number, showClosenessIndicator: boolean, wordSets: WordSets): void {
    gameSettingsRef.current = { endScore: endScore, showClosenessIndicator: showClosenessIndicator, wordSets: wordSets }
    setGameState(GameState.Guess)
  }

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
    router.push('../../')
  }

  const Content: React.FC = () => {
    switch (gameState) {
      case GameState.Setup:
        return <GameSettingsScreen onSaveSettings={setGameSettings} />
      case GameState.Intro:
        return <View>Intro</View>
      case GameState.Guess:
        const newSecretWord = getRandomSecretWord()
        // return <HintsScreen2
        // category={CategoryType.Place}
        // hints={newSecretWord.hints.slice(0, 5)}
        // onExit={setExit}
        // onGuess={(a) => console.log(a)}
        // />
        return <HintsScreen
          secretWord={newSecretWord}
          onExit={setExit}
          onTimeout={setGuessTimeOver}
          onSuccessGuess={setSuccessGuess}
        />

      // return <GuessScreen 
      //   secretWord={newSecretWord}
      //   setSuccessGuess={setSuccessGuess}
      //   setGuessTimeOver={setGuessTimeOver}        
      // />
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

  const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center'
    },
    gameContainer: {
      // flex: 1, 
      width: '100%',
      maxWidth: 800,
      marginHorizontal: 'auto',
    }
  })

  return <View style={styles.mainContainer}>
    <View style={styles.gameContainer} onLayout={({ nativeEvent: layout }) => console.log(layout.layout)}>
      <Stack.Screen
        options={{ title: 'Game Setup' }}
      />
      <Content />
    </View>
  </View>
}



export default GameScreen;