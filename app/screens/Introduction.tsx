import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Platform, Animated, useAnimatedValue, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import PrimaryButton from '../uiComponents/PrimaryButton';
import { MysteryIcon, FileIcon } from '../uiComponents/Icons';
import { Color } from '../uiComponents/Colors';

const { width, height } = Dimensions.get('window');

const IntroductionScreen: React.FC = () => {
  const router = useRouter()
  const opacityIlustration = useRef(new Animated.Value(0)).current;
  const xPositionIcons = useRef(new Animated.Value(0)).current;
  // const xPositionIcons = useAnimatedValue(0)

  const handlePlayPress = () => {
    router.push('screens/Setup')
  };

  useEffect(() => {
    Animated.loop(
      // Animated.sequence([
        Animated.timing(xPositionIcons, {
          toValue: width,
          duration: 10000,
          useNativeDriver: true,
          easing: Easing.linear
        }),
      // ])
    ).start();

    Animated.stagger(300, [
      Animated.timing(opacityIlustration, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.exp
      }),
    ]).start();
  }, [xPositionIcons, opacityIlustration]);

  const FileIconRow: React.FC = () => (
    <Animated.View style={[styles.iconContainer, {transform: [{translateX: xPositionIcons}]}]}>
      {
        [...Array(9)].map((_, index) => (
          <FileIcon key={index} size={height * 0.05}/>
        ))
      }
    </Animated.View>
  );
    
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2c3e50', '#34495e', '#2c3e50']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Animated.View style={{opacity: opacityIlustration}}>
            <MysteryIcon size={height * 0.15}/>
          </Animated.View>
          
          <Text style={styles.title}>20 Hints</Text>
          <Text style={styles.description}>
            Uncover secret words. Decipher clues. Become the ultimate word detective.
          </Text>
          <FileIconRow />
          <PrimaryButton title={'Investigate'} onPress={() => handlePlayPress()} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 'auto'
  },
  gradient: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-around',
    // flex: 1,
    paddingVertical: height * 0.05,
    paddingHorizontal: 16,
    width: width,
    maxWidth: 800,
    height: '100%',
    gap: Platform.OS === 'web' ? 42 : 0
  },
  title: {
    fontSize: Math.min(height * 0.07, 48),
    fontWeight: 'bold',
    color: Color.grey900,
    fontFamily: 'Courier',
    letterSpacing: 2,
    textAlign: 'center',
  },
  description: {
    fontSize: Math.min(height * 0.025, 18),
    color: '#bdc3c7',
    textAlign: 'center',
    lineHeight: Math.min(height * 0.035, 24),
    fontFamily: 'Courier',
    paddingHorizontal: width * 0.05,
  },
  iconContainer: {
    width: 3*width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // gap: width / 6,
    alignItems: 'center',
    // backgroundColor: '#FBA',
  }
});

export default IntroductionScreen;
