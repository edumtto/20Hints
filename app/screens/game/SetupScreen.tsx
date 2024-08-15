import {
  View,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import { Stack, useRouter } from "expo-router";
import { createContext } from 'react';
import PrimaryButton from '../../PrimaryButton';

interface SetupScreenProps {
  setGameSettings: (dictionaries: number[], timeLength: number) => void
}

const SetupScreen: React.FC<SetupScreenProps> = (props) => {
  const router = useRouter();

  const handleStartGame = () => {
    //router.navigate({ pathname: 'screens/GuessScreen', params: { dictionaries: [0], timeLength: 100 } })
    props.setGameSettings([0], 120)
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Game Setup'
        }}
      />

      <PrimaryButton title={'Start Game'} onPress={() => handleStartGame()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
});

export default SetupScreen;