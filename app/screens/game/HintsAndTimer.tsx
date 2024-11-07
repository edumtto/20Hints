import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Dimensions, Pressable } from 'react-native';
import { SecretWord } from '../../wordSets/secretWord';
import { Feather } from '@expo/vector-icons';
import { CategoryIcon } from '../../uiComponents/Icons'

const { width, height } = Dimensions.get('window');

interface TimerProps {
  time: number
}

// const TimerView: React.FC<TimerProps> = (props) => {
//   const minutes = Math.floor(props.time / 60)
//   const seconds = props.time - (minutes * 60)

//   const padZeroes = (num) => ('0' + num).slice(-2)

//   return <Text style={styles.timer}>{padZeroes(minutes) + ':' + padZeroes(seconds)}</Text>
// }

interface HintProps {
  number: number
  hint: string
}

const Hint: React.FC<HintProps> = (props) => {
  return <Text key={props.number} style={styles.hintText}>
    {props.number}. {props.hint}
  </Text>
}

interface HintsAndHeaderProps {
  secretWord: SecretWord;
  allowedGameTime: number;
  hintDisplayTime: number;
  isTimerStopped: boolean;
  onTimeUpdate: (time: number) => void;
  onExit: () => void
}

// Screen
const HintsAndHeader: React.FC<HintsAndHeaderProps> = (props) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0) // in seconds

  useEffect(() => {
    if (props.isTimerStopped) {
      console.log('=> stop timer')
      return
    }

    const interval = setInterval(() => {
      setElapsedTime((time: number) => {
        if (props.isTimerStopped || time >= props.allowedGameTime) {
          clearInterval(interval)
          return time
        }
        props.onTimeUpdate(time + 1)
        return time + 1
      })
    }, 1000)
  }, [])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const HeaderBar = () =>
    <View style={styles.header}>

      <Pressable onPress={props.onExit} style={styles.exitButton}>
        <Feather name="x" size={24} color="#ecf0f1" />
        <Text style={styles.headerButtonText}>Exit</Text>
      </Pressable>

      <View style={styles.categoryContainer}>
        <CategoryIcon category={props.secretWord.category} />
        <Text style={styles.categoryText}>{props.secretWord.category}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.headerButtonText}>{formatTime(elapsedTime)}</Text>
      </View>

    </View>

  const Hints = () => {
    const numberOfHintsDisplayed = Math.min(1 + Math.floor(elapsedTime / props.hintDisplayTime), props.secretWord.hints.length)

    return props.secretWord.hints
      .slice(0, numberOfHintsDisplayed)
      // .reverse()
      .map((value, index) =>
        <Hint key={index} number={index + 1} hint={value} />
      )
  }

  return (
    <View>
      <HeaderBar />
      <ScrollView style={styles.hintsContainer} scrollEnabled={true} alwaysBounceVertical={true}>
        <Hints />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  timeContainer: {
    backgroundColor: '#e74c3c',
    width: 80,
    alignItems: 'center',
    // paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 15,
  },
  headerButtonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier'
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 15,
  },
  categoryText: {
    color: '#ecf0f1',
    marginLeft: width * 0.02,
    fontSize: Math.min(height * 0.025, 18),
  },
  toolbarContainer: {
    borderBottomWidth: 0.5,
    marginHorizontal: 8,
    marginTop: 8,
  },
  timer: {
    fontSize: 22,
    textAlign: 'right',
    fontWeight: 600,
    fontFamily: 'monospace'
  },
  wordDescription: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 200,
    marginBottom: 8
  },
  hintsContainer: {
    paddingHorizontal: width * 0.05,
  },
  hintText: {
    color: '#ecf0f1',
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
    marginVertical: height * 0.01,
  },
  exitButton: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.02,
    borderRadius: 15,
    backgroundColor: '#70748C',
    alignItems: 'center',
    paddingVertical: height * 0.01,
  },
});

export default HintsAndHeader;