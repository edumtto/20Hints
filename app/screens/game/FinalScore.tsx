import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import PrimaryButton from '../../uiComponents/PrimaryButton';

export interface GameResultStats {
  isWordGuessed: boolean,
  timeSpent: number, // in seconds
  hintsRevealed: number,
  score: number
}

export interface FinalResultsScreenProps {
  gamesPlayed: number
  timeSpent: number
  globalScore: number
  endScore: number
  setExit: () => void
}

// RESULT SCREEN

const FinalResultScreen: React.FC<FinalResultsScreenProps> = (props) => {
  const Stat: React.FC<{label: string, value: any}> = (props) => 
    <View style={styles.statsRow}>
      <Text style={{ fontSize: 24, color: '#fff', fontWeight: 300 }}>{props.label}</Text>
      <Text style={{ fontSize: 24, color: '#fff'}}>{props.value}</Text>
    </View>

  const finalGrade: () => string = (() => {
    const normalizedTime = props.timeSpent / props.gamesPlayed
    if (normalizedTime < 15) return 'A++'
    if (normalizedTime < 25) return 'A+'
    if (normalizedTime <= 50) return 'A'
    if (normalizedTime <= 100) return 'B';
    if (normalizedTime <= 150) return 'C'
    return 'D'
  })

  return <SafeAreaView style={styles.container}>
    <Text style={styles.primaryText}>{'Final Score'}</Text>
    <View style={{paddingVertical: 32}}>
      <View style={styles.stats}>
        <Stat label={'Words guessed'}  value={props.gamesPlayed} />
        <Stat label={'Time spent'}  value={props.timeSpent + 's'} />
        <Stat label={'Grade'}  value={finalGrade()} />
      </View>
    </View>
    <PrimaryButton title={'Exit'} onPress={() => props.setExit()} />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
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
    padding: 8
  }
})

export default FinalResultScreen;