import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path, Circle } from 'react-native-svg';
import PrimaryButton from '../../uiComponents/PrimaryButton';

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

const WordSetIcon = ({ name, isSelected, onPress }) => {
  const iconSize = Math.min(width * 0.15, height * 0.15);
  
  const icons = {
    'Places': (
      <Svg height={iconSize * 0.6} width={iconSize * 0.6} viewBox="0 0 24 24" fill={isSelected ? "#e74c3c" : "#ecf0f1"}>
        <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </Svg>
    ),
    'Things': (
      <Svg height={iconSize * 0.6} width={iconSize * 0.6} viewBox="-30 -30 360 360" fill={isSelected ? "#e74c3c" : "#ecf0f1"}>
        <Path d="M150.414,43.018c-20.148,0-36.539,16.392-36.539,36.539c0,20.147,16.391,36.538,36.539,36.538 c20.147,0,36.539-16.391,36.539-36.538C186.953,59.41,170.561,43.018,150.414,43.018z M150.414,98.695 c-10.554,0-19.139-8.585-19.139-19.138c0-10.554,8.585-19.139,19.139-19.139c10.554,0,19.139,8.585,19.139,19.139 C169.553,90.109,160.967,98.695,150.414,98.695z"/>
        <Path d="M292.126,141.713H229.97V8.701c0-4.806-3.894-8.7-8.7-8.7H79.556c-4.805,0-8.7,3.894-8.7,8.7v133.013H8.7 c-4.805,0-8.7,3.894-8.7,8.7v141.713c0,4.806,3.895,8.7,8.7,8.7c12.438,0,270.988,0,283.426,0c4.806,0,8.7-3.894,8.7-8.7V150.413 C300.826,145.608,296.931,141.713,292.126,141.713z M88.256,17.401H212.57v124.313c-18.044,0-106.307,0-124.314,0V17.401z M141.714,283.426H17.4V159.113c18.044,0,106.307,0,124.314,0V283.426z M283.426,283.426H159.114V159.113 c18.002,0,106.266,0,124.313,0V283.426z" />
        <Path d="M193.432,257.808h55.677c4.806,0,8.7-3.894,8.7-8.7v-55.677c0-4.806-3.894-8.7-8.7-8.7h-55.677 c-4.806,0-8.7,3.895-8.7,8.7v55.677C184.732,253.914,188.626,257.808,193.432,257.808z M202.132,202.132h38.276v38.277h-38.276 V202.132z"/> 
        <Path d="M45.612,264.068H113.5c6.693,0,10.876-7.263,7.534-13.05l-33.944-58.793c-3.348-5.798-11.728-5.786-15.068,0 l-33.944,58.793C34.732,256.814,38.93,264.068,45.612,264.068z M79.556,213.974l18.876,32.693h-37.75L79.556,213.974z" />
      </Svg>
    ),
    'People': (
      <Svg height={iconSize * 0.6} width={iconSize * 0.6} viewBox="0 0 24 24" fill={isSelected ? "#e74c3c" : "#ecf0f1"}>
        <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </Svg>
    ),
    'Animals': (
      <Svg height={iconSize * 0.6} width={iconSize * 0.6} viewBox="0 0 28 28" fill={isSelected ? "#e74c3c" : "#ecf0f1"}>
        <Path d="M 4.0689801,20.422158 C 7.8425833,9.8527981 16.173374,10.209017 20.31971,19.32377 c 2.118231,4.656436 -3.287459,5.103712 -5.536685,3.954792 -1.113388,-0.570403 -3.57755,-0.578739 -4.684188,-0.01584 -2.6622785,1.422655 -7.1006669,0.158632 -6.0298569,-2.840564 z M 3.458434,15.460922 C 0.64903442,14.721442 -1.1110973,9.8776396 0.80098508,8.1477436 2.6904935,6.4382715 6.1038253,9.5083115 6.0906797,12.905434 c -0.00725,1.873172 -1.12005,2.953522 -2.6322457,2.555488 z m 15.912694,-0.0064 c -2.14383,-0.642453 -1.899957,-4.655997 0.412786,-6.7934079 2.553047,-2.3594965 5.071778,-0.2412833 3.935822,3.3099679 -0.737261,2.304844 -2.791209,3.950156 -4.348608,3.48344 z M 7.5958849,10.346032 C 5.3176988,9.8616858 4.025817,6.0454824 5.0845633,2.9276183 5.7301875,1.0263427 6.9592898,0.10295364 8.1727309,0.15777763 9.3173346,0.20949151 10.448004,1.1315804 11.061889,2.9243183 12.315613,6.5856059 10.291798,10.919166 7.5958849,10.346014 Z m 7.8837631,0.01792 C 12.356792,9.7531721 11.485523,3.3949465 14.18173,0.89219893 c 1.769045,-1.64211237 4.11713,-0.43432225 4.869811,2.50489637 0.925001,3.6121273 -1.048046,7.4604907 -3.571893,6.9668617 z"
       />
      </Svg>
    ),
    'Food': (
      <Svg height={iconSize * 0.6} width={iconSize * 0.6} viewBox="0 0 24 24" fill={isSelected ? "#e74c3c" : "#ecf0f1"}>
        <Path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
      </Svg>
    ),
    'Sports': (
      <Svg height={iconSize * 0.6} width={iconSize * 0.6} viewBox="0 0 24 24" fill={isSelected ? "#e74c3c" : "#ecf0f1"}>
        <Circle cx="12" cy="12" r="9" strokeWidth="2" stroke={isSelected ? "#e74c3c" : "#ecf0f1"} fill="none" />
        <Path d="M5.2,9.2l13.6,5.6 M5.2,14.8l13.6-5.6" stroke={isSelected ? "#e74c3c" : "#ecf0f1"} strokeWidth="2" />
        <Path d="M12,3v18" stroke={isSelected ? "#e74c3c" : "#ecf0f1"} strokeWidth="2" />
      </Svg>
    ),
  };

  return (
    <TouchableOpacity style={[styles.wordSetItem, isSelected && styles.selectedWordSetItem]} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icons[name]}
      </View>
      <Text style={[styles.wordSetText, isSelected && styles.selectedWordSetText]}>{name}</Text>
    </TouchableOpacity>
  );
};

const GameSettingsScreen = ({ onSaveSettings }) => {
  const [endScore, setEndScore] = useState(100);
  const [showClosenessIndicator, setShowClosenessIndicator] = useState(true);
  const [wordSets, setWordSets] = useState<WordSets>({
    'Places': true,
    'Things': true,
    'People': true,
    'Animals': false,
    'Food': false,
    'Sports': false,
  });

  const pointOptions = [50, 100, 125, 150, 200];

  const handleSave = () => {
    console.log("saving")
    onSaveSettings({ endScore, showClosenessIndicator, wordSets });
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
                <TouchableOpacity
                  key={points}
                  style={[
                    styles.segment,
                    endScore === points && styles.selectedSegment,
                  ]}
                  onPress={() => setEndScore(points)}
                >
                  <Text style={[
                    styles.segmentText,
                    endScore === points && styles.selectedSegmentText,
                  ]}>
                    {points}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingSection}>
            <Text style={styles.settingTitle}>Word Closeness Indicator</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={showClosenessIndicator ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setShowClosenessIndicator}
              value={showClosenessIndicator}
            />
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

          <PrimaryButton title='Save Settings' onPress={handleSave} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    // width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'space-around',
    // flex: 1,
    paddingVertical: height * 0.05,
    height: '100%'
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
  selectedWordSetItem: {
    
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