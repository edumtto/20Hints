import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View, Animated } from 'react-native';
import { Color } from '../../uiComponents/Colors';
import { CategoryIcon } from '../../uiComponents/Icons';
import { SecretWord } from '../../wordSets/secretWord';

const { width, height } = Dimensions.get('window');

interface TimerProps {
  time: number
}

interface HintProps {
  number: number
  hint: string
  isLastHint: boolean
}

const Hint: React.FC<HintProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (props.isLastHint) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
    }
  }, [props.isLastHint]);

  return (
    <Animated.View style={[
      styles.hintContainer,
      {
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
        backgroundColor: props.isLastHint ? Color.grey100 : 'transparent',
        borderRadius: props.isLastHint ? 8 : 0,
        padding: props.isLastHint ? 8 : 0,
      }
    ]}>
      <Text style={styles.hintText}>
        {props.number}. {props.hint}
      </Text>
    </Animated.View>
  );
}

interface HintsProps {
  hints: string[];
  numberOfHintsDisplayed: number;
}

const Hints: React.FC<HintsProps> = React.memo(({ hints, numberOfHintsDisplayed }) => {
  const displayedHints = useMemo(() => 
    hints.slice(0, numberOfHintsDisplayed).map((value, index) => (
      <Hint 
        key={index} 
        number={index + 1} 
        hint={value} 
        isLastHint={index === numberOfHintsDisplayed - 1}
      />
    )),
    [hints, numberOfHintsDisplayed]
  );

  return <>{displayedHints}</>;
});

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
  const scrollViewRef = useRef(null);

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
        <Feather name="x" size={20} color="#ecf0f1" />
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

  const numberOfHintsDisplayed = Math.min(
    1 + Math.floor(elapsedTime / props.hintDisplayTime), 
    props.secretWord.hints.length
  );

  return (
    <View style={{flex: 1}}>
      <HeaderBar />
      <ScrollView 
        style={styles.hintsContainer} 
        scrollEnabled={true} 
        alwaysBounceVertical={true}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}>
        <Hints 
          hints={props.secretWord.hints}
          numberOfHintsDisplayed={numberOfHintsDisplayed}
        />
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
    // backgroundColor: '#e74c3c',
    width: 80,
    alignItems: 'center',
    // paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 15,
  },
  headerButtonText: {
    color: Color.grey900,
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
    color: Color.grey900,
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
    height: "100%"
  },
  hintContainer: {
    marginVertical: height * 0.01,
  },
  hintText: {
    color: Color.grey900,
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
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