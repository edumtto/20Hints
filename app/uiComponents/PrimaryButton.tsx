import React from 'react';
import { Dimensions, GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native';
import { Color } from './Colors';

const { width, height } = Dimensions.get('window');

interface PrimaryButtonProps {
  title: string,
  onPress?: (event: GestureResponderEvent) => void
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  return <Pressable
    onPress={props.onPress}
    style={styles.primaryButton}
  >
    <Text style={styles.buttonTitle}>{props.title.toLocaleUpperCase()}</Text>
  </Pressable>
}

const styles = StyleSheet.create ({
  primaryButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 5,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: Math.min(height * 0.035, 24),
    fontWeight: 'semibold',
    color: Color.grey900,
    fontFamily: 'Courier',
  },
})

export default PrimaryButton;