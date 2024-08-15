import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SecretWord } from '../../secret-word';

// Timer component

interface TimerProps {
  time: number
}

const TimerView: React.FC<TimerProps> = (props) => {
  const minutes = Math.floor(props.time / 60)
  const seconds = props.time - (minutes * 60)

  const padZeroes = (num) => ('0' + num).slice(-2)

  return <Text style={{ padding: 8, fontSize: 22 }}>{padZeroes(minutes) + ':' + padZeroes(seconds)}</Text>
}

// Hint component

interface HintProps {
  number: number
  hint: string
}

const Hint: React.FC<HintProps> = (props) => {
  return <View style={styles.hintContainer}>
    <Text style={styles.hintNumber}>{props.number + '.'}</Text>
    <Text style={styles.hintText}>{props.hint}</Text> 
  </View>
}

interface HintsAndScoreProps {
  secretWord: SecretWord,
  isTimerStopped: boolean
}

const HintsAndScore: React.FC<HintsAndScoreProps> = (props) => {
  const [secretWord, _] = useState<SecretWord>(props.secretWord)
  const [time, setTime] = useState<number>(0) // in seconds
  const allowedGameTime: number = 60
  const hintDisplayTime = 2

  useEffect(() => {
    
    if (props.isTimerStopped) {
      console.log('=> stop timer')
      return
    }

    const interval = setInterval(() => {
        setTime((time: number) => {
          if (props.isTimerStopped || time > allowedGameTime) {
            clearInterval(interval)
            return time
          }
          return time + 1
        })
    } , 1000)
  },[])

  console.log('HintAndScore update, timer = ' + time)

  const GameStatusBar = () =>
    <View style={styles.wordContainer}>
        <TimerView time={time}/>
        <Text style={styles.word}>{'The word is a place'}</Text>
        {/* <Text>The word is </Text>
        <TextInput placeholder='???' style={{ backgroundColor: 'white', padding: 8, borderWidth: 1, borderColor: '#ccc'}}/> */}
     </View>

  const Hints = () => {
    const numberOfHintsDisplayed = Math.min(Math.floor(time / hintDisplayTime), props.secretWord.hints.length)
    let counter = 1

    return secretWord.hints
      .slice(0,numberOfHintsDisplayed)
      .map( (hint) => <Hint key={counter} number={counter++} hint={hint}/> )
  }

  return (
    <View>
    <GameStatusBar />
    <ScrollView style={{flexGrow: 0, height: 500 }}  scrollEnabled={true} alwaysBounceVertical={true}>
      <Hints />
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  wordContainer: {
    // flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
  },
  word: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    textAlign: 'center',
    padding: 24,
    fontSize: 24
  },
  hintContainer: {
    flex: 2,
    flexDirection: 'row',
    padding: 8,
  },
  hintNumber: {
    color: '#7F00E2',
    borderRadius: 20,
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 16
  },
  hintText: {
    alignContent: 'center',
    paddingLeft: 8,
    fontSize: 16
    // backgroundColor: 'gray'
  },
});

export default HintsAndScore;