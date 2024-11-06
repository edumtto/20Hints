import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Switch, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path, Circle } from 'react-native-svg';
import PrimaryButton from '../uiComponents/PrimaryButton';
import { useRouter } from 'expo-router';

export interface WordSets {
  Places: boolean;
  Things: boolean;
  People: boolean;
  Animals: boolean;
  Food: boolean;
  Sports: boolean;
}

const { width, height } = Dimensions.get('window');

const SettingsIcon = () => (
  <Svg height={height * 0.08} width={height * 0.08} viewBox="0 0 24 24" fill="#ecf0f1">
    <Path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </Svg>
);

const WordSetSelector = ({ name, isSelected, onPress }) => {
  
}

const GameSettingsScreen = () => {
  const pointOptions = [50, 100, 125, 150, 200];
  const router = useRouter()
  
  const [endScore, setEndScore] = useState(100);
  const [showClosenessIndicator, setShowClosenessIndicator] = useState(true);
  const [wordSets, setWordSets] = useState({
    'Places': true,
    'Things': true,
    'People': true,
    'Animals': false,
    'Food': false,
    'Sports': false,
  });

  const handleSave = () => {
    const selectedSets: number[] = []
    const values = Object.values(wordSets)
    for (let i=0; i < values.length; i++) {
      if (values[i]) {
        selectedSets.push(i)
      } 
    }
    
    router.push({
      pathname:'screens/game/Play', 
      params: {
        endScore: endScore, 
        showCloseness: showClosenessIndicator ? 1 : 0, 
        wordSets: selectedSets
      }
    })
  };

  const toggleWordSet = (set) => {
    setWordSets(prev => ({ ...prev, [set]: !prev[set] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2c3e50', '#34495e', '#2c3e50']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <SettingsIcon />
          <Text style={styles.title}>Game Settings</Text>

          <View style={styles.settingSection}>
            <Text style={styles.settingTitle}>Max Points per Round</Text>
            <View style={styles.segmentedControl}>
              {pointOptions.map((points) => (
                <Pressable
                  key={points}
                  style={[styles.segment, endScore === points && styles.selectedSegment]}
                  onPress={() => setEndScore(points)}
                >
                  <Text style={[styles.segmentText, endScore === points && styles.selectedSegmentText]}>
                    {points}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.settingSection}>
            <Text style={styles.settingTitle}>Word Sets</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wordSetCarousel}>
              {Object.entries(wordSets).map(([set, isSelected]) => (
                <WordSetIcon
                  key={set}
                  name={set}
                  isSelected={isSelected}
                  onPress={() => toggleWordSet(set)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.settingSection}>
            <Text style={styles.settingTitle}>Word Closeness Indicator</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#ecf0f1" }}
              thumbColor={showClosenessIndicator ? "#e74c3c" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setShowClosenessIndicator}
              value={showClosenessIndicator}
            />
          </View>

          <PrimaryButton title='Save Settings' onPress={handleSave} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#2c3e50',
    justifyContent: 'space-around',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-around',
    // flex: 1,
    paddingVertical: height * 0.05,
    height: '100%',
  },
  title: {
    fontSize: Math.min(height * 0.05, 36),
    fontWeight: 'bold',
    color: '#ecf0f1',
    fontFamily: 'Courier',
    letterSpacing: 2,
    textAlign: 'center',
    // marginBottom: height * 0.03,
  },
  settingSection: {
    width: width * 0.9,
    // marginBottom: height * 0.03,
  },
  settingTitle: {
    fontSize: Math.min(height * 0.025, 18),
    color: '#bdc3c7',
    fontFamily: 'Courier',
    marginBottom: height * 0.015,
    textAlign: 'left'
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: '#e74c3c',
  },
  segmentText: {
    color: '#ecf0f1',
    fontFamily: 'Courier',
    fontSize: Math.min(height * 0.02, 16),
  },
  selectedSegmentText: {
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 25,
    elevation: 5,
    marginTop: height * 0.03,
  },
  saveButtonText: {
    fontSize: Math.min(height * 0.03, 20),
    fontWeight: 'bold',
    color: '#ecf0f1',
    fontFamily: 'Courier',
  },
  wordSetCarousel: {
    flexDirection: 'row',
  },
  wordSetItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  selectedWordSetText: {
    color: '#ecf0f1',
    fontFamily: 'Courier',
    fontSize: Math.min(height * 0.02, 16),
  },
  iconContainer: {
    
  },
  wordSetText: {
    color: '#ecf0f1',
    fontFamily: 'Courier',
    fontSize: Math.min(height * 0.02, 16),
  }

});

export default GameSettingsScreen;