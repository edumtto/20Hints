import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState, useMemo, memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import getRandomSecretWord from '../../wordSets/secretWordDatabase';
import FinalResultScreen from './FinalScore';
import GuessScreen from './Guess';
import ResultScreen, { GameResultStats } from './Score';
import CustomAlert from '../../uiComponents/CustomAlert';

// Types
enum GameState {
  Guess, Results, FinalResults
}

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

// Custom Hooks
const useGameSettings = () => {
  const params = useLocalSearchParams<{ endScore: string, showCloseness: string, wordSets: string }>();
  const [gameSettings, setGameSettings] = useState<GameSettings>({ 
    endScore: 50, 
    showClosenessIndicator: false, 
    wordSets: [] 
  });

  useEffect(() => {
    setGameSettings({ 
      endScore: Number(params.endScore), 
      showClosenessIndicator: params.showCloseness === '1', 
      wordSets: params.wordSets.split(',').map(Number)
    });
  }, [params.endScore, params.showCloseness, params.wordSets]);

  return gameSettings;
};

const useGameState = (endScore: number) => {
  const [gameState, setGameState] = useState(GameState.Guess);
  const resultRef = useRef<GameResultStats>({ 
    secretWord: '', 
    isWordGuessed: false, 
    elapsedTime: 0, 
    hintsRevealed: 0, 
    score: 0 
  });
  const globalStatusRef = useRef<GlobalGameStats>({ 
    gamesPlayed: 0, 
    elapsedTime: 0, 
    globalScore: 0 
  });

  const setSuccessGuess = (stats: GameResultStats) => {
    resultRef.current = stats;
    const newGlobalStatus: GlobalGameStats = {
      gamesPlayed: globalStatusRef.current.gamesPlayed + 1,
      elapsedTime: globalStatusRef.current.elapsedTime + stats.elapsedTime,
      globalScore: globalStatusRef.current.globalScore + stats.score
    };
    globalStatusRef.current = newGlobalStatus;

    if (globalStatusRef.current.globalScore >= endScore) {
      setGameState(GameState.FinalResults);
    } else {
      setGameState(GameState.Results);
    }
  };

  const setGuessTimeOver = (stats: GameResultStats) => {
    resultRef.current = stats;
    const newGlobalStatus: GlobalGameStats = {
      gamesPlayed: globalStatusRef.current.gamesPlayed + 1,
      elapsedTime: globalStatusRef.current.elapsedTime + stats.elapsedTime,
      globalScore: globalStatusRef.current.globalScore
    };
    globalStatusRef.current = newGlobalStatus;
    setGameState(GameState.Results);
  };

  const setNextGame = () => setGameState(GameState.Guess);

  return {
    gameState,
    resultRef,
    globalStatusRef,
    setSuccessGuess,
    setGuessTimeOver,
    setNextGame
  };
};

// Components
interface ContentProps {
  gameState: GameState;
  gameSettings: GameSettings;
  resultRef: React.MutableRefObject<GameResultStats>;
  globalStatusRef: React.MutableRefObject<GlobalGameStats>;
  setNextGame: () => void;
  setExit: (showConfirmation?: boolean) => void;
  setGuessTimeOver: (stats: GameResultStats) => void;
  setSuccessGuess: (stats: GameResultStats) => void;
}

const Content = memo(({ 
  gameState, 
  gameSettings, 
  resultRef, 
  globalStatusRef, 
  setNextGame, 
  setExit,
  setGuessTimeOver,
  setSuccessGuess 
}: ContentProps) => {
  const [secretWord, setSecretWord] = useState(null);

  useEffect(() => {
    if (gameState === GameState.Guess && gameSettings.wordSets && gameSettings.wordSets.length > 0) {
      setSecretWord(getRandomSecretWord(gameSettings.wordSets));
    } else {
      setSecretWord(null);
    }
  }, [gameState, gameSettings.wordSets]);

  switch (gameState) {
    case GameState.Guess:
      if (!secretWord) return null;
      console.log('Secret word: ' + secretWord.word)
      return <GuessScreen
        secretWord={secretWord}
        onExit={setExit}
        onTimeout={setGuessTimeOver}
        onSuccessGuess={setSuccessGuess}
      />;

    case GameState.Results:
      return <ResultScreen
        stats={resultRef.current}
        globalScore={globalStatusRef.current.globalScore}
        endScore={gameSettings.endScore}
        setNextGame={setNextGame}
      />;

    case GameState.FinalResults:
      return <FinalResultScreen
        gamesPlayed={globalStatusRef.current.gamesPlayed}
        timeSpent={globalStatusRef.current.elapsedTime}
        globalScore={globalStatusRef.current.globalScore}
        endScore={gameSettings.endScore}
        setExit={setExit}
      />;
  }
});

// Main Screen Component
const GameScreen: React.FC = () => {
  const router = useRouter();
  const [showExitAlert, setShowExitAlert] = useState(false);
  
  const gameSettings = useGameSettings();
  const {
    gameState,
    resultRef,
    globalStatusRef,
    setSuccessGuess,
    setGuessTimeOver,
    setNextGame
  } = useGameState(gameSettings.endScore);

  const setExit = (showConfirmation?: boolean) => {
    if (showConfirmation) {
      setShowExitAlert(true);
    } else {
      router.dismissAll();
    }
  };

  const handleExit = () => {
    setShowExitAlert(false);
    router.dismissAll();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.gameContainer}>
        <Stack.Screen options={{ title: 'Game Setup' }} />
        <Content 
          gameState={gameState}
          gameSettings={gameSettings}
          resultRef={resultRef}
          globalStatusRef={globalStatusRef}
          setNextGame={setNextGame}
          setExit={setExit}
          setGuessTimeOver={setGuessTimeOver}
          setSuccessGuess={setSuccessGuess}
        />
        <CustomAlert
          visible={showExitAlert}
          title="EXIT GAME"
          message="Are you sure? You will lose your progress."
          buttons={[
            {
              text: "CANCEL",
              onPress: () => setShowExitAlert(false)
            },
            {
              text: "EXIT",
              onPress: handleExit,
              style: "destructive"
            }
          ]}
          onDismiss={() => setShowExitAlert(false)}
        />
      </View>
    </View>
  );
};

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
});

export default GameScreen;