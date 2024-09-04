import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import { Stack, useRouter } from "expo-router";
import { createContext, useState } from 'react';
import PrimaryButton from '../../PrimaryButton';

interface SetupScreenProps {
  setGameSettings: (endScore: number) => void
}

const CircleButtonSelector: React.FC<{options: number[], selected: number, setSelected: (index: number) => void}> = (props) => {
  return <View style={{paddingVertical: 40}}>
      <Text style={{fontSize: 28, marginVertical: 16, color: 'white'}}>Max Score</Text>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', width: 340}}>
        {props.options.map((value, index, _) => {
          return <Pressable key={index} onPress={() => props.setSelected(index)}>
            <Text 
              style={{
                width: 60, 
                height: 60, 
                borderRadius: 30, 
                backgroundColor: index == props.selected ? 'yellow':'white', 
                textAlign: 'center', 
                fontSize: 24,
                fontWeight: 500, 
                paddingVertical: 16
              }}>
                {value}
            </Text>
          </Pressable>
        })}
      </View>
    </View>
}
  

const SetupScreen: React.FC<SetupScreenProps> = (props) => {
  const router = useRouter();
  const maxScoreOptions = [50,70,100,150, 200]
  const [maxScoreIndex, setMaxScoreIndex] = useState(0)

  const handleStartGame = () => {
    //router.navigate({ pathname: 'screens/GuessScreen', params: { dictionaries: [0], timeLength: 100 } })
    props.setGameSettings(maxScoreOptions[maxScoreIndex])
  };

  function setMaxScoreSelected(index: number) {
    setMaxScoreIndex(index)
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Game Setup'
        }}
      />
      <CircleButtonSelector options={maxScoreOptions} selected={maxScoreIndex} setSelected={setMaxScoreSelected}/>
      <PrimaryButton title={'Start Game'} onPress={() => handleStartGame()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3E2B77',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SetupScreen;