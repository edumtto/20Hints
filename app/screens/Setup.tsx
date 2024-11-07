import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Switch, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryButton from '../uiComponents/PrimaryButton';
import { useRouter } from 'expo-router';
import { CategoryIcon, SettingsIcon } from '../uiComponents/Icons';
import { SecretWordCategory } from '../wordSets/secretWord';

const { width, height } = Dimensions.get('window');

// Components
const WordSetSelector = ({ name, isSelected, onPress }) => {
  const iconSize = Math.min(width * 0.1, height * 0.1);
  const color = isSelected ? "#e74c3c" : "#ecf0f1"
  return (
    <Pressable style={[styles.wordSetItem, isSelected]} onPress={onPress}>
      <View>
        <CategoryIcon category={name} size={iconSize} color={color}/>
      </View>
      <Text style={[styles.wordSetText, isSelected && styles.selectedWordSetText]}>{name}</Text>
    </Pressable>
  );
}

type SelectedCategoryMap = { [key in SecretWordCategory]: boolean }

// Screen
const GameSettingsScreen = () => {
  const pointOptions = [50, 100, 125, 150, 200];
  const router = useRouter()
  
  const [endScore, setEndScore] = useState(100);
  const [showClosenessIndicator, setShowClosenessIndicator] = useState(true);
  const [wordSets, setWordSets] = useState<SelectedCategoryMap>({
    [SecretWordCategory.Person]: true,
    [SecretWordCategory.Place]: true,
    [SecretWordCategory.Thing]: true,
    [SecretWordCategory.Animal]: false,
    [SecretWordCategory.Food]: false,
    [SecretWordCategory.Sport]: false
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
          <SettingsIcon size={height * 0.08} />
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
                <WordSetSelector
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
  },
  settingSection: {
    width: width * 0.9,
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
  wordSetText: {
    color: '#ecf0f1',
    fontFamily: 'Courier',
    fontSize: Math.min(height * 0.02, 16),
  }
});

export default GameSettingsScreen;