import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Switch, ScrollView, Pressable, Platform, Animated, useAnimatedValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryButton from '../uiComponents/PrimaryButton';
import { useRouter } from 'expo-router';
import { CategoryIcon, SettingsIcon } from '../uiComponents/Icons';
import { SecretWordCategory } from '../wordSets/secretWord';
import { Color, Gradient } from '../uiComponents/Colors';
import CustomAlert from '../uiComponents/CustomAlert';

const { width, height } = Dimensions.get('window');

// Components
const WordSetSelector = ({ name, isSelected, onPress }) => {
  const iconSize = Math.min(height * 0.1, 48);
  const color = isSelected ? Color.baseBlue : Color.grey100
  return (
    <Pressable style={[styles.wordSetItem, isSelected]} onPress={onPress}>
      <View style={{ paddingBottom: 4 }}>
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
  const [showAlert, setShowAlert] = useState(false);
  const [wordSets, setWordSets] = useState<SelectedCategoryMap>({
    [SecretWordCategory.Person]: true,
    [SecretWordCategory.Place]: true,
    [SecretWordCategory.Object]: true,
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
      setShowAlert(true);
      return;
    }
    pushPlayScreen(selectedSets)
  };

  const toggleWordSet = (set) => {
    setWordSets(prev => ({ ...prev, [set]: !prev[set] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: animatedOpacity}}>
        <LinearGradient
          colors={Gradient.greyBackground}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* <SettingsIcon size={height * 0.1} /> */}
            <Text style={styles.title}>SETUP</Text>

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
                thumbColor={showClosenessIndicator ? Color.baseBlue : Color.grey900}
                {...(Platform.OS === 'ios' ? { activeThumbColor: Color.baseRed } : {})}
                onValueChange={setShowClosenessIndicator}
                value={showClosenessIndicator}
              />
            </View>

            <PrimaryButton title='Save Settings' onPress={handleSave} />
            
          </View>
          
        </LinearGradient>
      </Animated.View>
      <CustomAlert
        visible={showAlert}
        title="WARNING"
        message="Please select at least one word set to continue."
        buttons={[
          {
            text: "OK",
            onPress: () => setShowAlert(false)
          }
        ]}
        onDismiss={() => setShowAlert(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Color.grey100,
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
    fontSize: 42, // Math.min(height * 0.05, 36),
    // fontWeight: 'bold',
    color: Color.accentYellow,
    fontFamily: 'Courier',
    letterSpacing: 2,
    textAlign: 'center',
  },
  settingSection: {
    width: '100%',
    padding: 16
  },
  settingTitle: {
    fontSize: 18, //Math.min(height * 0.025, 18),
    fontWeight: 'bold',
    color: Color.grey900,
    fontFamily: 'Courier',
    marginBottom: height * 0.015,
    textAlign: 'left'
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: Color.grey100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: Color.baseBlue,
  },
  segmentText: {
    color: Color.grey900,
    fontFamily: 'Courier',
    fontSize: 16 //Math.min(height * 0.02, 16),
  },
  selectedSegmentText: {
    fontWeight: 'bold',
  },
  wordSetCarousel: {
    flexDirection: 'row',
  },
  wordSetItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  selectedWordSetText: {
    color: Color.grey900,
    fontFamily: 'Courier',
    fontSize: 16 // Math.min(height * 0.02, 16),
  },
  wordSetText: {
    color: Color.grey800,
    fontFamily: 'Courier',
    fontSize: 16 // Math.min(height * 0.02, 16),
  }
});

export default GameSettingsScreen;