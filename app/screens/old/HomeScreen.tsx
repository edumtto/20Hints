import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import PrimaryButton from '../../uiComponents/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      // padding: 0,
      // margin: 0,
      backgroundColor: '#3E2B77',
      // alignItems: 'center'
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      padding: 20,
      color: '#fff'
    },
    ruleNumber: {
      height: 30,
      width: 30,
      borderRadius: 15,
      overflow: 'hidden',
      alignContent: 'center',
      textAlign: 'center',
      backgroundColor: '#fff',
      marginRight: 16,
      fontSize: 22,
    },
    ruleText: {
      fontSize: 22,
      fontWeight: '100',
      alignContent: 'center',
      color: '#fff'
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
    router.push('screens/game/Play')
  };

  const RuleItem: React.FC<{ index: number, text: string }> = (props) => {
    return <View style={{ flex: 1, flexDirection: 'row', flexShrink: 1, paddingHorizontal: 20, paddingVertical: 8 }}>
      <Text style={styles.ruleNumber}>{props.index}</Text>
      <Text style={styles.ruleText}>{props.text}</Text>
    </View>
  }

  return (
    <SafeAreaView style={styles.container}>
       
      <View>
        <Text style={styles.title}>20 Hints</Text>
        <RuleItem index={1} text={'Check hints'} />
        <RuleItem index={2} text={'Guess the secret word'} />
        <RuleItem index={3} text={'Accumulate points'} />
        <PrimaryButton title={'Play'} onPress={() => handlePlayPress()} />
      </View>
      
    </SafeAreaView>
  );
};

export default HomeScreen