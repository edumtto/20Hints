import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from 'react';
import SetupScreen from './SetupScreen';
import GuessScreen from './GuessScreen';
import ResultScreen, { GameResultStats } from './ResultsScreen';
import { getRandomSecretWord } from '../../wordSets/secretWordDatabase';
import FinalResultScreen from './FinalResultsScreen';
import GameSettingsScreen from './Setup';

enum GameState {
  Setup, Intro, Guess, Results, FinalResults
}

interface GlobalGameSettings {
  endScore: number
}

interface GlobalGameStats {
  gamesPlayed: number
  timeSpent: number
  globalScore: number
}

// GAME SCREEN

const GameScreen: React.FC = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState(GameState.Setup)
  const gameSettingsRef = useRef<GlobalGameSettings>({endScore: 50})
  const globalStatusRef = useRef<GlobalGameStats>({gamesPlayed: 0, timeSpent: 0, globalScore: 0})
  const resultRef = useRef<GameResultStats>({isWordGuessed: false, timeSpent: 0, hintsRevealed: 0, score: 0})
  

  console.log('Game screen update')

  function setGameSettings(endScore: number): void {
    gameSettingsRef.current = {endScore: endScore}
    setGameState(GameState.Guess)
  }

  function setSuccessGuess(stats: GameResultStats): void {
    resultRef.current = stats

    const newGlobalStatus: GlobalGameStats = {
      gamesPlayed: globalStatusRef.current.gamesPlayed + 1,
      timeSpent: globalStatusRef.current.timeSpent + stats.timeSpent,
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
      timeSpent: globalStatusRef.current.timeSpent + stats.timeSpent,
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
        return <GameSettingsScreen onSaveSettings={() => console.log('saved')} />
        //return <SetupScreen setGameSettings={setGameSettings} />
      case GameState.Intro:
        return <View>Intro</View>
      case GameState.Guess:
        const newSecretWord = getRandomSecretWord()
        // console.log("->>>>> " + newSecretWord)
        return <GuessScreen 
          secretWord={newSecretWord}
          setSuccessGuess={setSuccessGuess}
          setGuessTimeOver={setGuessTimeOver}        
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
          timeSpent={globalStatusRef.current.timeSpent}
          globalScore={globalStatusRef.current.globalScore}
          endScore={gameSettingsRef.current.endScore}
          setExit={setExit}
        />
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      // backgroundColor: '#3E2B77',
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

  // console.log('Game screen update')
  return <View style={styles.mainContainer}>
    <SafeAreaView style={styles.gameContainer} onLayout={({ nativeEvent: layout }) => console.log(layout.layout)}>
      <Stack.Screen
        options={{title: 'Game Setup'}}
      />
      <Content />
    </SafeAreaView>
  </View>
}



export default GameScreen;