import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native';

interface PrimaryButtonProps {
  title: string,
  onPress?: (event: GestureResponderEvent) => void
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  return <Pressable
    onPress={props.onPress}
    style={styles.primaryButton}
  >
    <Text style={styles.buttonTitle}>{props.title}</Text>
  </Pressable>
}

const styles = StyleSheet.create ({
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'rgb(255 240 0)',
    margin: 20,
    
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  }
})

export default PrimaryButton;