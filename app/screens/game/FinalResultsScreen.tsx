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

  return <SafeAreaView style={styles.container}>
    <Text style={styles.primaryText}>{'You Won'}</Text>
    <View style={{paddingVertical: 32}}>
      <View style={styles.stats}>
        <Stat label={'Words guessed'}  value={props.gamesPlayed} />
        <Stat label={'Time spent'}  value={props.timeSpent + 's'} />
        <Stat label={'Grade'}  value={'A+'} />
      </View>
    </View>
    <PrimaryButton title={'Exit'} onPress={() => props.setExit()} />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3E2B77',
    // display: 'flex',
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

export default FinalResultScreen;