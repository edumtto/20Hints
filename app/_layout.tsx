import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold'
        }
      }}
    >
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen
        name="screens/HomeScreen"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="screens/GuessScreen"
        options={{ headerShown: true, headerTitle: 'Guess the Word' }}
      />
      <Stack.Screen
        name="screens/DetailScreen"
        options={{ headerShown: true, headerTitle: 'Details' }}
      />
    </Stack>
  );
}
