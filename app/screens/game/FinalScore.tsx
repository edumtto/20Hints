import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../uiComponents/PrimaryButton';
import { Color } from '../../uiComponents/Colors';
import Constants from '../../uiComponents/Constants';

export interface FinalResultsScreenProps {
  gamesPlayed: number
  timeSpent: number
  globalScore: number
  endScore: number
  setExit: (showConfirmation?: boolean) => void
}

const { width, height } = Dimensions.get('window');
const lottieAnimationSize = Math.min(width, Constants.maxWidth)

// RESULT SCREEN

const FinalResultScreen: React.FC<FinalResultsScreenProps> = (props) => {
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const scoreAnimation = useRef(new Animated.Value(0)).current;
  const gradeAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scoreAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(gradeAnimation, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
    ]).start();

  }, [headerAnimation, scoreAnimation, gradeAnimation, buttonAnimation]);

  const Stat: React.FC<{ label: string, value: any}> = (props) =>
    <View style={styles.statsRow}>
      <Text style={styles.statsLabel}>{props.label}</Text>
      <Text style={{ fontSize: 24, color: '#3CE88E', fontFamily: 'Courier',}}>{props.value}</Text>
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
    <View style={styles.animationContainer}>
      <LottieView
        source={require('../../../assets/fireworks2.json')}
        autoPlay
        loop
        style={{
          width: lottieAnimationSize,
          height: lottieAnimationSize,
        }}
      />
    </View>
    <View style={styles.content}>
      <Animated.Text style={[styles.primaryText, {opacity: headerAnimation }]}>
        {'Final Score'}
      </Animated.Text>
      
      <Animated.View style={[{ paddingVertical: 32, opacity: scoreAnimation }]}>
        <View style={styles.stats}>
          <Stat label={'Words guessed'} value={props.gamesPlayed} />
          <Stat label={'Time spent'} value={props.timeSpent + 's'} />
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>{'Grade'}</Text>
            <Animated.Text style={{ fontSize: 56, color: Color.accentYellow, fontFamily: 'Courier', transform: [ {scale: gradeAnimation}]}}>
              {finalGrade()}
            </Animated.Text>
          </View>
        </View>
      </Animated.View>
      <Animated.View style={{ opacity: buttonAnimation }}>
        <PrimaryButton title={'Exit'} onPress={() => props.setExit(false)} />
      </Animated.View>
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.grey100,
    height: Platform.OS === 'web' ? height : '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  animationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: height * 0.05,
    height: '100%',
    width: width,
    maxWidth: Constants.maxWidth,
    position: 'relative',
    zIndex: 1,
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
  },
  stats: {
    flexDirection: 'column',
    padding: 12,
    margin: 16,
    borderColor: Color.grey500,
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300,
  },
  statsLabel: {
    fontSize: 24, 
    color: '#fff', 
    fontFamily: 'Courier', 
    fontWeight: 300, 
    paddingVertical: 16
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  }
})

export default FinalResultScreen;