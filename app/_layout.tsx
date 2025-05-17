import React from 'react';
import { Stack } from "expo-router";
import { StatusBar, Platform } from "react-native";

export default function RootLayout() {
  return (
    <>
      {Platform.OS === 'ios' && (
        <StatusBar barStyle="light-content" />
      )}
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
          name="screens/game/Play"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}