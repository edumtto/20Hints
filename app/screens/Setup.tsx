import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Switch, ScrollView, Pressable, Platform, Animated, useAnimatedValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryButton from '../uiComponents/PrimaryButton';
import { useRouter } from 'expo-router';
import { CategoryIcon, SettingsIcon } from '../uiComponents/Icons';
import { SecretWordCategory } from '../wordSets/secretWord';
import { Color, Gradient } from '../uiComponents/Colors';

const { width, height } = Dimensions.get('window');

// Components
const WordSetSelector = ({ name, isSelected, onPress }) => {
  const iconSize = Math.min(height * 0.1, 80);
  const color = isSelected ? Color.baseRed : Color.grey100
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

  const animatedOpacity = useAnimatedValue(1);

  const pushPlayScreen: (selectedSets: number[]) => void = (selectedSets) => {
    router.push({
      pathname:'screens/game/Play', 
      params: {
        endScore: endScore,
        showCloseness: showClosenessIndicator ? 1 : 0, 
        wordSets: selectedSets
      }
    })
  }

  const fadeOut: (callback: Animated.EndCallback) => void = (callback) => {
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(callback);
      }

  const handleSave = () => {
    const selectedSets: number[] = []
    const values = Object.values(wordSets)
    for (let i=0; i < values.length; i++) {
      if (values[i]) {
        selectedSets.push(i)
      } 
    }
    
    if (selectedSets.length == 0) {
      alert("Please select at least one word set")
      return
    }
    fadeOut(() => pushPlayScreen(selectedSets))
  };

  const toggleWordSet = (set) => {
    setWordSets(prev => ({ ...prev, [set]: !prev[set] }));
  };

  const BaseSwitch = () => {
    if (Platform.OS == 'web') {
      return <Switch
      // trackColor={{ false: "#767577", true: Color.grey900 }}
      // thumbColor={showClosenessIndicator ? Color.baseRed : Color.grey900}
      // activeThumbColor={Color.baseRed}
      onValueChange={setShowClosenessIndicator}
      value={showClosenessIndicator}
    />
    }
    return <Switch
    trackColor={{ false: "#767577", true: Color.grey900 }}
    thumbColor={showClosenessIndicator ? Color.baseRed : Color.grey900}
    ios_backgroundColor={Color.grey200}
    onValueChange={setShowClosenessIndicator}
    value={showClosenessIndicator}
  />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: animatedOpacity }}>
        <LinearGradient
          colors={Gradient.greyBackground}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <SettingsIcon size={height * 0.1} />
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
              <ScrollView horizontal showsHorizontalScrollIndicator={Platform.OS === 'web'} style={styles.wordSetCarousel}>
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
                trackColor={{ false: "#767577", true: Color.grey900 }}
                thumbColor={showClosenessIndicator ? Color.baseRed : Color.grey900}
                activeThumbColor={Color.baseRed}
                // ios_backgroundColor={Color.grey200}
                onValueChange={setShowClosenessIndicator}
                value={showClosenessIndicator}
              />
            </View>

            <PrimaryButton title='Save Settings' onPress={handleSave} />
            
          </View>
          
        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#2c3e50',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 'auto'
  },
  gradient: {
    paddingHorizontal: 16
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: height * 0.05,
    height: '100%',
    width: width,
    maxWidth: 800,
    gap: Platform.OS === 'web' ? null : 0
  },
  title: {
    fontSize: Math.min(height * 0.05, 36),
    fontWeight: 'bold',
    color: Color.grey900,
    fontFamily: 'Courier',
    letterSpacing: 2,
    textAlign: 'center',
  },
  settingSection: {
    width: '100%',
    padding: 16
  },
  settingTitle: {
    fontSize: Math.min(height * 0.025, 18),
    color: Color.grey800,
    fontFamily: 'Courier',
    marginBottom: height * 0.015,
    textAlign: 'left'
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: Color.grey100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: Color.baseRed,
  },
  segmentText: {
    color: Color.grey900,
    fontFamily: 'Courier',
    fontSize: Math.min(height * 0.02, 16),
  },
  selectedSegmentText: {
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: Color.baseRed,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 25,
    elevation: 5,
    marginTop: height * 0.03,
  },
  saveButtonText: {
    fontSize: Math.min(height * 0.03, 20),
    fontWeight: 'bold',
    color: Color.grey900,
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
    color: Color.grey900,
    fontFamily: 'Courier',
    fontSize: Math.min(height * 0.02, 16),
  },
  wordSetText: {
    color: Color.grey900,
    fontFamily: 'Courier',
    fontSize: Math.min(height * 0.02, 16),
  }
});

export default GameSettingsScreen;