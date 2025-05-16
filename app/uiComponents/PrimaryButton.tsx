import React, { useEffect, useRef } from 'react';
import { Dimensions, GestureResponderEvent, Pressable, StyleSheet, Text, Animated } from 'react-native';
import { Color } from './Colors';

const { width, height } = Dimensions.get('window');

interface PrimaryButtonProps {
  title: string,
  onPress?: (event: GestureResponderEvent) => void
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Create a sequence of animations
    const animation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.02,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ]);

    // Loop the animation
    Animated.loop(animation).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.buttonContainer,
        {
          transform: [
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      <Pressable
        onPress={props.onPress}
        style={({ pressed }) => [
          styles.primaryButton,
          { 
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }]
          }
        ]}
      >
        <Text style={styles.buttonTitle}>{props.title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
  },
  primaryButton: {
    backgroundColor: Color.baseRed,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.grey200,
    shadowColor: Color.grey500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: Math.min(height * 0.035, 24),
    fontWeight: 'bold',
    color: Color.grey900,
    fontFamily: 'Courier',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
})

export default PrimaryButton;