import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Color, Gradient } from '../uiComponents/Colors';
import Constants from '../uiComponents/Constants';
import { FileIcon, MysteryIcon } from '../uiComponents/Icons';
import PrimaryButton from '../uiComponents/PrimaryButton';
import GlitchText from '../uiComponents/GlitchText';

const { width, height } = Dimensions.get('window');

const contentWidth = Math.min(width, Constants.maxWidth);

const IntroductionScreen: React.FC = () => {
  const router = useRouter()
  const topIllustrationAnimation = useRef(new Animated.Value(0)).current;
  const carousellAnimation = useRef(new Animated.Value(0)).current;
  // const xPositionIcons = useAnimatedValue(0)

  const handlePlayPress = () => {
    router.push('screens/Setup')
  };

  useEffect(() => {
    Animated.stagger(300, [
      Animated.timing(topIllustrationAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: Platform.OS !== 'web',
        easing: Easing.exp
      }),
    ]).start();

    Animated.loop(
        Animated.timing(carousellAnimation, {
          toValue: contentWidth,
          duration: 10000,
          useNativeDriver: Platform.OS !== 'web',
          easing: Easing.linear
        }),
    ).start();
  }, [topIllustrationAnimation, carousellAnimation]);

  const AnimatedCarousell: React.FC = () => (
    <Animated.View style={[styles.iconContainer, {transform: [{translateX: carousellAnimation}]}]}>
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
        colors={Gradient.greyBackground}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Animated.View style={{opacity: topIllustrationAnimation}}>
            <MysteryIcon size={height * 0.15}/>
          </Animated.View>
          
          <GlitchText
            text={"20 HINTS"}
            style={styles.title}
            isGlitching={true}
            glitchDuration={800}
            glitchIntensity={0.5}
          />

          <Text style={styles.description}>
            Uncover secret words. Decipher clues. Become the ultimate word detective.
          </Text>
          <AnimatedCarousell />
          <PrimaryButton title={'Investigate'} onPress={() => handlePlayPress()} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Color.grey100,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 'auto'
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: height * 0.05,
    paddingHorizontal: 16,
    width: contentWidth,
    height: '100%',
    gap: Platform.OS === 'web' ? 42 : 0,
    overflow: 'hidden',
  },
  title: {
    fontSize: Math.min(height * 0.07, 48),
    fontWeight: 'bold',
    color: Color.accentYellow,
    fontFamily: 'Courier',
    letterSpacing: 2,
    textAlign: 'center',
  },
  description: {
    fontSize: 18, // Math.min(height * 0.025, 18),
    color: Color.grey900,
    textAlign: 'center',
    lineHeight: Math.min(height * 0.035, 24),
    fontFamily: 'Courier',
    paddingHorizontal: width * 0.05,
  },
  iconContainer: {
    width: 3 * contentWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'web' ? 42 : 0,
  }
});

export default IntroductionScreen;
