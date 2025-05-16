import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../uiComponents/PrimaryButton';

// Props Interfaces
export interface GameResultStats {
  secretWord: string,
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

const { width, height } = Dimensions.get('window');

// Components
const ScoreProgress: React.FC<{value: number, maxValue: number}> = (props) => {
  const progressOpacity = props.value > 0 ? 1 : 0
  return <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <View style={{ marginVertical: 16 }}>
      <View style={{ height: 16, width: 200, backgroundColor: '#34495e', borderRadius: 8}}></View>
      <View style={{ height: 16, width: props.value, opacity: progressOpacity, backgroundColor: '#3CE88E', position: 'absolute', borderRadius: 8, borderWidth: 3, borderColor: '#34495e'}}></View>
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
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const bodyAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
     Animated.stagger(300, [
          Animated.spring(headerAnimation, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true
          }),
        ]).start();

         Animated.stagger(800, [
              Animated.timing(bodyAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.exp
              }),
            ]).start();
      }, [headerAnimation]);

  const message: [string, string] = (() => {
    if (props.stats.isWordGuessed == false) {
      return ['Time\'s up', 'The word was ' + props.stats.secretWord.toUpperCase()]
    }
    if (props.stats.hintsRevealed == 1) {
      return ['Unbelievable', 'Only '+ props.stats.hintsRevealed + ' hint used!']
    }
    if (props.stats.hintsRevealed < 5) {
      return ['Impressive!', 'Only '+ props.stats.hintsRevealed + ' hints used!']
    }
    if (props.stats.hintsRevealed < 10) {
      return ['Great job!', 'You are fast']
    }
    return ['Good job!', 'You got it right']
  })()

  const buttonTitle = props.stats.isWordGuessed == false ? 'Try again' : 'Next Game'

  function handleStartNextGame() {
      props.setNextGame()
  }

  return <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <View style={{ alignItems: 'center', paddingHorizontal: 16}}>
        <Animated.Text style={[styles.primaryText, { transform: [{scale: headerAnimation}] }]}>
          {message[0]}
        </Animated.Text>
        <Text style={styles.secondaryText}>{message[1]}</Text>
      </View>

      <Animated.View style={[{paddingVertical: 32}, {opacity: bodyAnimation}]}>
        <Text style={styles.scoreText}>{'+ ' + props.stats.score + ' pts'}</Text>
        <View style={styles.stats}>
          <Stat label={'Word guessed'}  value={props.stats.isWordGuessed ? '✓' : 'no'} />
          <Stat label={'Hints revealed'}  value={props.stats.hintsRevealed} />
          <Stat label={'Time spent'}  value={props.stats.elapsedTime + 's'} />
        </View>
        <ScoreProgress value={props.globalScore} maxValue={props.endScore}/>
      </Animated.View>
      <PrimaryButton title={buttonTitle} onPress={() => handleStartNextGame()} />
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    height: Platform.OS === 'web' ? height : '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: height * 0.05,
    height: '100%',
    width: width,
    maxWidth: 800,
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
    textAlign: 'center',
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