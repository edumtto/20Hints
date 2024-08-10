import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';


interface ResultsScreenParams {
  isWordGuessed: boolean,
  timeSpent: number, // in seconds
  hintsRevealed: number
}

const ResultScreen: React.FC = () => {
  // const params = useLocalSearchParams()
  return <Text>Detail:  </Text>
}

export default ResultScreen