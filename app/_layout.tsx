import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'rgb(255 240 0)',
        },
        // headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold'
        }
      }}
    >
      {/* <Stack.Screen
        name="screens/HomeScreen"
        options={{ headerShown: true, headerTitle: 'Rules', header: () => null }}
      /> */}
      <Stack.Screen
        name="screens/GameScreen"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="screens/GuessScreen"
        options={{ headerShown: true, headerTitle: 'Guess the Word', presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name="screens/DetailScreen"
        options={{ headerShown: true, headerTitle: 'Details', presentation: 'modal'}}
      />
    </Stack>
  );
}
