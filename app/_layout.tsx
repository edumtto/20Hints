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
        name="screens/CreateScreen"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="screens/DetailScreen"
        options={{ headerShown: true }}
      />
    </Stack>
  );
}
