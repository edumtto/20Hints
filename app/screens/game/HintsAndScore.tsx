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

  return <Text style={styles.timer}>{padZeroes(minutes) + ':' + padZeroes(seconds)}</Text>
}

// Hint component

interface HintProps {
  number: number
  hint: string
}

const Hint: React.FC<HintProps> = (props) => {
  return <View style={styles.hintContainer} >
    <Text style={styles.hintNumber}>{props.number + '.'}</Text>
    <Text style={styles.hintText}>{props.hint}</Text> 
  </View>
}

const LargeHint: React.FC<HintProps> = (props) => {
  return <View style={styles.largeHintContainer} >
    <Text style={styles.largeHintNumber}>{props.number + '.'}</Text>
    <Text style={styles.largeHintText}>{props.hint}</Text> 
  </View>
}

interface HintsAndScoreProps {
  secretWord: SecretWord,
  isTimerStopped: boolean
}

const HintsAndScore: React.FC<HintsAndScoreProps> = (props) => {
  const [secretWord, _] = useState<SecretWord>(props.secretWord)
  const [time, setTime] = useState<number>(0) // in seconds
  const allowedGameTime: number = 120
  const hintDisplayTime = 6


  useEffect(() => {
    
    if (props.isTimerStopped) {
      console.log('=> stop timer')
      return
    }

    const interval = setInterval(() => {
        setTime((time: number) => {
          if (props.isTimerStopped || time >= allowedGameTime) {
            clearInterval(interval)
            return time
          }
          return time + 1
        })
    } , 1000)
  },[])

  console.log('HintAndScore update, timer = ' + time)

  const GameStatusBar = () =>
    <View style={styles.toolbarContainer}>
        <TimerView time={time}/>
        <Text style={styles.wordDescription}>{'The word is a place'}</Text>
        {/* <Text>The word is </Text>
        <TextInput placeholder='???' style={{ backgroundColor: 'white', padding: 8, borderWidth: 1, borderColor: '#ccc'}}/> */}
     </View>

  const Hints = () => {
    const numberOfHintsDisplayed = Math.min(1 + Math.floor(time / hintDisplayTime), props.secretWord.hints.length)
    let counter = numberOfHintsDisplayed

    return secretWord.hints
      .slice(0,numberOfHintsDisplayed)
      .reverse()
      .map( (hint) => {
        if (counter === numberOfHintsDisplayed) {
          return <LargeHint key={counter} number={counter--} hint={hint} /> 
        }
        return <Hint key={counter} number={counter--} hint={hint} /> 
      }
    )
  }

  return (
    <View>
    <GameStatusBar />
    <View style={{ height: 500}}>
      <ScrollView style={{ flexGrow: 0 }}  scrollEnabled={true} alwaysBounceVertical={true}> 
        <Hints />
      </ScrollView>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  toolbarContainer: {
    borderBottomWidth: 0.5,
    marginHorizontal: 8,
    marginTop: 8
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
  hintContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  hintNumber: {
    color: '#7F00E2',
    borderRadius: 20,
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 28,
    fontWeight: 100
  },
  hintText: {
    alignContent: 'center',
    paddingLeft: 8,
    fontSize: 28,
    fontWeight: 200
  },
  largeHintContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 24
  },
  largeHintNumber: {
    color: '#7F00E2',
    borderRadius: 20,
    textAlign: 'center',
    alignContent: 'flex-start',
    fontSize: 32,
    fontWeight: 300
  },
  largeHintText: {
    alignContent: 'center',
    paddingLeft: 8,
    fontSize: 32,
    fontWeight: 400
  },
});

export default HintsAndScore;