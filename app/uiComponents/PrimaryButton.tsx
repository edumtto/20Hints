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
    <Text style={styles.buttonTitle}>{props.title}</Text>
  </Pressable>
}

const styles = StyleSheet.create ({
  primaryButton: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    // borderRadius: 20,
    // elevation: 3,
    // backgroundColor: 'rgb(255 240 0)',
    // margin: 20,
    backgroundColor: '#e74c3c',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 25,
    elevation: 5,
  },
  buttonTitle: {
    // fontSize: 24,
    // fontWeight: 'bold',
    // fontFamily: 'sans-serif'
    fontSize: Math.min(height * 0.035, 24),
    fontWeight: 'bold',
    color: Color.grey900,
    fontFamily: 'Courier',
  },
})

export default PrimaryButton;