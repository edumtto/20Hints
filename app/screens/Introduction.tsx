import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import PrimaryButton from '../uiComponents/PrimaryButton';

const { width, height } = Dimensions.get('window');

const MysteryIcon = () => (
  <Svg height={height * 0.15} width={height * 0.15} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="45" fill="#2c3e50" />
    <Path d="M50 20 Q60 20 60 30 L60 45 Q60 55 50 55 Q40 55 40 45 L40 30 Q40 20 50 20 Z" fill="#ecf0f1" />
    <Circle cx="50" cy="75" r="5" fill="#ecf0f1" />
  </Svg>
);

const FileIcon = () => (
  <Svg height={height * 0.05} width={height * 0.05} viewBox="0 0 40 40">
    <Path d="M5 5 L25 5 L35 15 L35 35 L5 35 Z" fill="#34495e" />
    <Path d="M25 5 L25 15 L35 15" fill="none" stroke="#ecf0f1" strokeWidth="2" />
  </Svg>
);

const IntroductionScreen: React.FC = () => {
  const router = useRouter()

  const handlePlayPress = () => {
    router.push('screens/game/GameScreen')
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
    // height: '100%'
  },
  gradient: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
    // flex: 1,
    paddingVertical: height * 0.05,
    height: '100%'
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
    width: '100%',
  }
});

export default IntroductionScreen;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 20,
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 10,
//   },
//   description: {
//     fontSize: 18,
//     color: '#ffffff',
//     textAlign: 'center',
//     marginBottom: 40,
//     lineHeight: 24,
//   },
//   playButton: {
//     backgroundColor: '#FFD700',
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     elevation: 5,
//   },
//   playButtonText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#192f6a',
//   },
// });

// export default IntroductionScreen;