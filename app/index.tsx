import HomeScreen from "./screens/HomeScreen";
import { Text, View, Button, SafeAreaViewComponent } from "react-native";
import { Stack } from 'expo-router';
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
    <SafeAreaView>
      <HomeScreen />
    </SafeAreaView>
      
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
