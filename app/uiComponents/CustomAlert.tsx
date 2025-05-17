import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Color } from './Colors';
import GlitchText from './GlitchText';

const { width, height } = Dimensions.get('window');

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: {
    text: string;
    onPress: () => void;
    style?: 'default' | 'destructive';
  }[];
  onDismiss?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons,
  onDismiss
}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.alertContainer}>
        <GlitchText
          text={title}
          style={styles.title}
          isGlitching={true}
          glitchDuration={500}
          glitchIntensity={0.3}
        />
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          {buttons.map((button, index) => (
            <Pressable
              key={index}
              style={[
                styles.button,
                button.style === 'destructive' && styles.destructiveButton
              ]}
              onPress={button.onPress}
            >
              <Text style={[
                styles.buttonText,
                button.style === 'destructive' && styles.destructiveButtonText
              ]}>
                {button.text}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  alertContainer: {
    backgroundColor: Color.grey50,
    borderRadius: 10,
    padding: width * 0.05,
    width: width * 0.8,
    maxWidth: 400,
    borderWidth: 1,
    borderColor: Color.grey500,
  },
  title: {
    fontSize: Math.min(height * 0.035, 24),
    color: Color.accentYellow,
    textAlign: 'center',
    marginBottom: height * 0.02,
    fontFamily: 'Courier',
  },
  message: {
    fontSize: Math.min(height * 0.025, 18),
    color: Color.grey900,
    textAlign: 'center',
    marginBottom: height * 0.03,
    fontFamily: 'Courier',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: width * 0.02,
  },
  button: {
    flex: 1,
    backgroundColor: Color.grey200,
    paddingVertical: height * 0.015,
    borderRadius: 5,
    alignItems: 'center',
  },
  destructiveButton: {
    backgroundColor: Color.baseRed,
  },
  buttonText: {
    color: Color.grey900,
    fontSize: Math.min(height * 0.025, 18),
    fontFamily: 'Courier',
  },
  destructiveButtonText: {
    color: Color.grey900,
  },
});

export default CustomAlert; 