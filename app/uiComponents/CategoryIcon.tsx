import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { SecretWordCategory } from '../wordSets/secretWord';
import { Dimensions } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const CategoryIcon: React.FC = (category: SecretWordCategory) => {
  switch (category) {
    case SecretWordCategory.Person:
      return <FontAwesome6 name='face-grin-wide' size={18} color='black' />
    case SecretWordCategory.Place:
      return <FontAwesome6 name='location-dot' size={18} color='black' />
    case SecretWordCategory.Thing:
      return <FontAwesome6 name='cube' size={18} color='black' />
  }
}

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
    <Pressable style={[styles.wordSetItem, isSelected]} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icons[name]}
      </View>
      <Text style={[styles.wordSetText, isSelected && styles.selectedWordSetText]}>{name}</Text>
    </Pressable>
  );
};