import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      padding: 0,
      margin: 0,
      backgroundColor: '#ccc',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      padding: 20
    },
    ruleNumber: {
      height: 40, 
      width: 40,
      borderRadius: 20,
      alignContent: 'center',
      textAlign: 'center',
      backgroundColor: '#fff',
      marginRight: 16,
      fontSize: 22,
    },
    ruleText: {
      fontSize: 22,
      fontWeight: 'normal',
      alignContent: 'center',
    },
    buttonTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    playButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: 'rgb(255 240 0)',
      margin: 20,
    }
  });

  const handlePlayPress = () => {
    router.push('screens/GameScreen')
  };

  const RuleItem: React.FC<{index: number, text: string}> = (props) => {
    return <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 8 }}>
      <Text style={styles.ruleNumber}>{props.index}</Text>
      <Text style={styles.ruleText}>{props.text}</Text>
    </View>
  } 

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Rules</Text>
        <RuleItem index={1} text={'Pick a card'}/>
        <RuleItem index={2} text={'Reveal hints'}/>
        <RuleItem index={3} text={'Guess the word'}/>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={() => handlePlayPress()}>
         <Text style={styles.buttonTitle}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen