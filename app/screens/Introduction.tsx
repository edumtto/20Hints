import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import PrimaryButton from '../uiComponents/PrimaryButton';

const { width, height } = Dimensions.get('window');

const MysteryIcon = () => (
  <Svg height={height * 0.15} width={height * 0.15} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="45" fill="#2c3e50" stroke="#ecf0f1" strokeWidth="2"/>
    <Path d="M50 20 Q60 20 60 30 L60 45 Q60 55 50 55 Q40 55 40 45 L40 30 Q40 20 50 20 Z" fill="#ecf0f1" />
    <Circle cx="50" cy="75" r="5" fill="#ecf0f1" />
  </Svg>
);

const FileIcon = () => (
  <Svg height={height * 0.05} width={height * 0.05} viewBox="0 0 40 40">
    <Path d="M5 5 L25 5 L35 15 L35 35 L5 35 Z" fill="#45505e" />
    <Path d="M25 5 L25 15 L35 15" fill="none" stroke="#70748C" strokeWidth="2" />
  </Svg>
);

const IntroductionScreen: React.FC = () => {
  const router = useRouter()

  const handlePlayPress = () => {
    router.push('screens/game/Play')
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2c3e50', '#34495e', '#2c3e50']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <MysteryIcon />
          <Text style={styles.title}>20 Hints</Text>
          <Text style={styles.description}>
            Uncover secret words. Decipher clues. Become the ultimate word detective.
          </Text>
          <View style={styles.iconContainer}>
            <FileIcon />
            <FileIcon />
            <FileIcon />
          </View>
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
    backgroundColor: '#2c3e50',
    alignItems: 'center',
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
    // paddingHorizontal: 16,
    maxWidth: 800,
    height: '100%',
    gap: Platform.OS === 'web' ? 42 : 0
  },
  title: {
    fontSize: Math.min(height * 0.07, 48),
    fontWeight: 'bold',
    color: '#ecf0f1',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: width / 6
  }
});

export default IntroductionScreen;
