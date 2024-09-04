import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PrimaryButton from '../../PrimaryButton';

export interface GameResultStats {
  isWordGuessed: boolean,
  timeSpent: number, // in seconds
  hintsRevealed: number,
  score: number
}

export interface ResultsScreenProps {
  stats: GameResultStats
  globalScore: number
  endScore: number
  setNextGame: () => void
}

const ScoreProgress: React.FC<{value: number, maxValue: number}> = (props) => {
  return <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center'}}>
    {/* <Text style={{ fontSize: 14, color: '#fff'}}>TOTAL SCORE</Text> */}
  <View style={{ marginVertical: 16 }}>
    <View style={{ height: 14, width: 200, backgroundColor: '#fff', borderWidth: 1, borderColor: 'black'}}></View>
    <View style={{ height: 14, width: props.value, backgroundColor: '#000', position: 'absolute'}}></View>
  </View>
    <Text style={{ fontSize: 18, color: '#fff'}}>{props.value + '/' + props.maxValue}</Text>
  </View  >
}

// RESULT SCREEN

const ResultScreen: React.FC<ResultsScreenProps> = (props) => {

  function getMessage(): [string, string] {
    if (props.stats.isWordGuessed == false) {
      return ['Oh, no! You were so close.', 'Best luck next time']
    }
    if (props.stats.hintsRevealed == 1) {
      return ['Unbelievable', 'Only '+ props.stats.hintsRevealed + ' hint used!']
    }
    if (props.stats.hintsRevealed < 5) {
      return ['Impressive!', 'Only '+ props.stats.hintsRevealed + ' hints used!']
    }
    if (props.stats.hintsRevealed < 10) {
      return ['Great job!', 'You used less than half of the hints.']
    }
    return ['Good job!', 'You can train to guess even faster next time']
  }

  function handleStartNextGame() {
      props.setNextGame()
  }

  const message = getMessage()

  const Stat: React.FC<{label: string, value: any}> = (props) => 
    <View style={styles.statsRow}>
      <Text style={{ fontSize: 24, color: '#fff', fontWeight: 300 }}>{props.label}</Text>
      <Text style={{ fontSize: 24, color: '#fff'}}>{props.value}</Text>
    </View>

  return <View style={styles.container}>
    <Text style={styles.primaryText}>{message[0]}</Text>
    <Text style={styles.secondaryText}>{message[1]}</Text>
    <View style={{paddingVertical: 32}}>
      <Text style={styles.scoreText}>{'+' + props.stats.score + 'pts'}</Text>
      {/* <View style={styles.stats}>
        <Stat label={'Word guessed'}  value={props.stats.isWordGuessed ? '✓' : 'no'} />
        <Stat label={'Hints revealed'}  value={props.stats.hintsRevealed} />
        <Stat label={'Time spent'}  value={props.stats.timeSpent + 's'} />
      </View> */}
      <ScoreProgress value={props.globalScore} maxValue={props.endScore}/>
    </View>
    <PrimaryButton title={'Next Game'} onPress={() => handleStartNextGame()} />
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3E2B77',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 48,
    marginBottom: 16
  },
  secondaryText: {
    color: 'rgb(255 240 0)',
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 200
  },
  scoreText: {
    color: '#fff',
    fontSize: 60,
  },
  stats: {
    flex: 1,
    flexDirection: 'column',
    padding: 12,
    margin: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  }
})

export default ResultScreen;