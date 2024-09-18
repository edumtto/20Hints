import HomeScreen from "./screens/HomeScreen";
import { Platform, StyleSheet } from "react-native";
import { Stack } from 'expo-router';
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen2 from "./screens/HomeScreen2";


export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen2 />
    </SafeAreaView>
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
