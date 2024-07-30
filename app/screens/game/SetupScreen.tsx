import {
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { Stack, useRouter } from "expo-router";
import { createContext } from 'react';

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

      <Button title='Start Game' onPress={handleStartGame} />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SetupScreen;