import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import PrimaryButton from '../uiComponents/PrimaryButton';

const HomeScreen2: React.FC = () => {

  const [inputLength, setInputLength] = useState(0);
  
  const handleChange = (text) => {
    setInputLength(text.length)
  }
  
  return(
    <View>
      <TextInput onChangeText={text => handleChange(text)} />
      <Text>The input length is {inputLength} </Text>
    </View>
  );
};

export default HomeScreen2