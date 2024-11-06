import React from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import PrimaryButton from '../../uiComponents/PrimaryButton';

// Props Interfaces
export interface GameResultStats {
  isWordGuessed: boolean,
  elapsedTime: number, // in seconds
  hintsRevealed: number,
  score: number
}

export interface ScoreScreenProps {
  stats: GameResultStats
  globalScore: number
  endScore: number
  setNextGame: () => void
}

// Components
const ScoreProgress: React.FC<{value: number, maxValue: number}> = (props) => {
  return <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <View style={{ marginVertical: 16 }}>
      <View style={{ height: 16, width: 200, backgroundColor: '#34495e', borderRadius: 8}}></View>
      <View style={{ height: 16, width: props.value, backgroundColor: '#3CE88E', position: 'absolute', borderRadius: 8, borderWidth: 3, borderColor: '#34495e'}}></View>
    </View>
    <Text style={{ fontSize: 18, fontFamily: 'Courier', color: '#fff'}}>{props.value + '/' + props.maxValue}</Text>
  </View  >
}

const Stat: React.FC<{label: string, value: any}> = (props) => 
  <View style={styles.statsRow}>
    <Text style={{ fontSize: 24, color: '#fff', fontFamily: 'Courier', fontWeight: 300 }}>{props.label}</Text>
    <Text style={{ fontSize: 24, color: '#3CE88E', fontFamily: 'Courier',}}>{props.value}</Text>
  </View>

// Screen
const ScoreScreen: React.FC<ScoreScreenProps> = (props) => {
  const message: [string, string] = (() => {
    if (props.stats.isWordGuessed == false) {
      return ['Time\'s up', 'Best luck next time']
    }
    if (props.stats.hintsRevealed == 1) {
      return ['Unbelievable', 'Only '+ props.stats.hintsRevealed + ' hint used!']
    }
    if (props.stats.hintsRevealed < 5) {
      return ['Impressive!', 'Only '+ props.stats.hintsRevealed + ' hints used!']
    }
    if (props.stats.hintsRevealed < 10) {
      return ['Great job!', 'You were fast.']
    }
    return ['Good job!', 'You got it right']
  })()

  const buttonTitle = props.stats.isWordGuessed == false ? 'Try again' : 'Next Game'

  function handleStartNextGame() {
      props.setNextGame()
  }

  return <SafeAreaView style={styles.container}>
    <View style={{ alignItems: 'center', paddingHorizontal: 16}}>
      <Text style={styles.primaryText}>{message[0]}</Text>
      <Text style={styles.secondaryText}>{message[1]}</Text>
    </View>

    <View style={{paddingVertical: 32}}>
      <Text style={styles.scoreText}>{'+ ' + props.stats.score + ' pts'}</Text>
      <View style={styles.stats}>
        <Stat label={'Word guessed'}  value={props.stats.isWordGuessed ? '✓' : 'no'} />
        <Stat label={'Hints revealed'}  value={props.stats.hintsRevealed} />
        <Stat label={'Time spent'}  value={props.stats.elapsedTime + 's'} />
      </View>
      <ScoreProgress value={props.globalScore} maxValue={props.endScore}/>
    </View>
    <PrimaryButton title={buttonTitle} onPress={() => handleStartNextGame()} />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  primaryText: {
    color: '#fff',
    fontSize: 48,
    marginBottom: 16,
    fontFamily: 'Courier',
  },
  secondaryText: {
    color: '#C7E83C',
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 200,
    fontFamily: 'Courier',
  },
  scoreText: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'center',
    fontFamily: 'Courier'
  },
  stats: {
    flexDirection: 'column',
    padding: 12,
    margin: 16,
    borderColor: '#70748C',
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  }
})

export default ScoreScreen;