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
      <Stack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/game/GameScreen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
