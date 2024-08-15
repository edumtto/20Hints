import HomeScreen from "./screens/HomeScreen";
import { Platform, StyleSheet } from "react-native";
import { Stack } from 'expo-router';
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: "auto",
    // width: "100%",
    // maxWidth: 800
    height: '100%'
  },
});
