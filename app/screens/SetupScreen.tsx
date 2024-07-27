import {
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { getHintCard, getRandomHintCardIndex } from "../card-database-service";
import { Stack, useRouter } from "expo-router";


const SetupScreen: React.FC = () => {
  const router = useRouter();
  
  const handleStartGame = () => {
    let hintCardIndex: number = getRandomHintCardIndex()
    const hintCard = getHintCard(Number(hintCardIndex))
    router.navigate({pathname: 'screens/GuessScreen', params: { hintCardIndex: hintCardIndex }})
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