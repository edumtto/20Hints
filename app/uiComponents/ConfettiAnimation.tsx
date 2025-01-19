import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, StyleSheet, Dimensions } from 'react-native';

interface ConfettiPieceProps {
  startX: number;
  startY: number;
  color: string;
}

interface ConfettiProps {
  duration?: number;
  pieceCount?: number;
  colors?: string[];
  onAnimationComplete?: () => void;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ startX, startY, color }) => {
  const position = useRef(new Animated.ValueXY({ x: startX, y: startY })).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const randomRotation = Math.random() * 360;
    const randomDistance = Math.random() * 200 + 100;
    const randomX = (Math.random() - 0.5) * 2 * randomDistance;

    Animated.parallel([
      Animated.timing(position, {
        toValue: {
          x: startX + randomX,
          y: startY + randomDistance,
        },
        duration: 1000,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: randomRotation,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.confettiPiece,
        {
          backgroundColor: color,
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: rotation.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
            { scale },
          ],
        },
      ]}
    />
  );
};

const ConfettiAnimation: React.FC<ConfettiProps> = ({
  duration = 1000,
  pieceCount = 30,
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  onAnimationComplete,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onAnimationComplete]);

  const { width } = Dimensions.get('window');
  const centerX = width / 2;

  return (
    <View style={styles.container}>
      {Array.from({ length: pieceCount }).map((_, index) => (
        <ConfettiPiece
          key={index}
          startX={centerX}
          startY={0}
          color={colors[index % colors.length]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  confettiPiece: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default ConfettiAnimation;

// In your component:
const YourComponent = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <View style={styles.container}>
      {/* Your other content */}
      
      {showConfetti && (
        <ConfettiAnimation
          duration={1000}
          pieceCount={30}
          colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']}
          onAnimationComplete={() => setShowConfetti(false)}
        />
      )}
    </View>
  );
};