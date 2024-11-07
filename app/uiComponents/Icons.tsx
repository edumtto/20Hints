import React from 'react';
import { Ionicons } from '@expo/vector-icons';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { SecretWordCategory } from '../wordSets/secretWord';
import { Svg, Path, Circle } from 'react-native-svg';

export const CategoryIcon: React.FC<{category: SecretWordCategory, size?: number, color?: string}> = ({ category, size = 24, color}) => {
  type CategoryIconConfigMap = { 
    [key in SecretWordCategory]: {
      iconPath: keyof typeof Ionicons.glyphMap;
      iconColor: string;
    } 
  }

  const CATEGORY_CONFIGS: CategoryIconConfigMap = {
    [SecretWordCategory.Person]: { iconPath: 'person', iconColor: '#e67e22' },
    [SecretWordCategory.Place]: { iconPath: 'location', iconColor: '#1abc9c' },
    [SecretWordCategory.Thing]: { iconPath: 'cube', iconColor: '#9b59b6' },
    [SecretWordCategory.Animal]: { iconPath: 'paw', iconColor: '#E83C68' },
    [SecretWordCategory.Food]: { iconPath: 'pizza', iconColor: '#C7E83C' },
    [SecretWordCategory.Sport]: { iconPath: 'basketball', iconColor: '#9C3428' },
  };
  const config = CATEGORY_CONFIGS[category] ?? { iconPath: 'help-circle', iconColor: '#bdc3c7'};
  return <Ionicons name={config.iconPath} size={size} color={color ?? config.iconColor} />
};

export const SettingsIcon: React.FC<{size: number}> = ({ size = 60 }) =>
  <Svg height={size} width={size} viewBox="0 0 24 24" fill="#ecf0f1">
    <Path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </Svg>

export const MysteryIcon: React.FC<{size: number}> = ({ size = 60 }) => (
  <Svg height={size} width={size} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="45" fill="#2c3e50" stroke="#ecf0f1" strokeWidth="2"/>
    <Path d="M50 20 Q60 20 60 30 L60 45 Q60 55 50 55 Q40 55 40 45 L40 30 Q40 20 50 20 Z" fill="#ecf0f1" />
    <Circle cx="50" cy="75" r="5" fill="#ecf0f1" />
  </Svg>
);

export const FileIcon: React.FC<{size: number}> = ({ size = 60 }) => (
  <Svg height={size} width={size} viewBox="0 0 40 40">
    <Path d="M5 5 L25 5 L35 15 L35 35 L5 35 Z" fill="#45505e" />
    <Path d="M25 5 L25 15 L35 15" fill="none" stroke="#70748C" strokeWidth="2" />
  </Svg>
);