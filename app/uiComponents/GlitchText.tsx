import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, TextStyle } from 'react-native';

interface GlitchTextProps {
  text: string;
  style?: TextStyle;
  isGlitching?: boolean;
  glitchDuration?: number;
  glitchIntensity?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  style,
  isGlitching = true,
  glitchDuration = 300,
  glitchIntensity = 0.3
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glitchAnim = useRef(new Animated.Value(0)).current;
  const [glitchText, setGlitchText] = useState(text);

  useEffect(() => {
    if (isGlitching) {
      // Initial fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      // Glitch effect
      const glitchInterval = setInterval(() => {
        // Random glitch effect
        const randomChars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123';
        const glitchedText = text
          .split('')
          .map((char, i) => {
            if (Math.random() < glitchIntensity) {
              return randomChars[Math.floor(Math.random() * randomChars.length)];
            }
            return char;
          })
          .join('');
        
        setGlitchText(glitchedText);
      }, 50);

      // Stop glitch after specified duration
      setTimeout(() => {
        clearInterval(glitchInterval);
        setGlitchText(text);
      }, glitchDuration);

      // Glitch animation
      Animated.sequence([
        Animated.timing(glitchAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(glitchAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(glitchAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(glitchAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [isGlitching, text]);

  return (
    <Animated.Text
      style={[
        styles.text,
        style,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateX: glitchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.random() * 4 - 2]
              })
            }
          ]
        }
      ]}
    >
      {glitchText}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Courier',
  }
});

export default GlitchText; 