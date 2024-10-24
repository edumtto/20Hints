import HomeScreen from "./screens/old/HomeScreen";
import { Platform, StyleSheet } from "react-native";
import { Stack } from 'expo-router';
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IntroductionScreen from "./screens/Introduction";


export default function Index() {
  return (
      <IntroductionScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: "auto",
    // width: "100%",
    // maxWidth: 800
    // height: '100%',
    // backgroundColor: 'transparent'
  },
});
