import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export interface ResultsScreenProps {
  isWordGuessed: boolean,
  timeSpent: number, // in seconds
  hintsRevealed: number
}

const ResultScreen: React.FC<ResultsScreenProps> = (props) => {
  // const params = useLocalSearchParams()
  return <View style={styles.container}>
    <Text style={styles.text}>You guessed right!</Text>
    <Text>{'Time: ' + props.timeSpent}</Text>
  </View>
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3E2B77',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 32
  }
})

export default ResultScreen;