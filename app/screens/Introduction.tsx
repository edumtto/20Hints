import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import PrimaryButton from '../uiComponents/PrimaryButton';
import { MysteryIcon, FileIcon } from '../uiComponents/Icons';

const { width, height } = Dimensions.get('window');

const IntroductionScreen: React.FC = () => {
  const router = useRouter()

  const handlePlayPress = () => {
    router.push('screens/Setup')
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2c3e50', '#34495e', '#2c3e50']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <MysteryIcon size={height * 0.15}/>
          <Text style={styles.title}>20 Hints</Text>
          <Text style={styles.description}>
            Uncover secret words. Decipher clues. Become the ultimate word detective.
          </Text>
          <View style={styles.iconContainer}>
            <FileIcon size={height * 0.05}/>
            <FileIcon size={height * 0.05}/>
            <FileIcon size={height * 0.05}/>
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
    justifyContent: 'space-around'
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
    maxWidth: 1024,
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
