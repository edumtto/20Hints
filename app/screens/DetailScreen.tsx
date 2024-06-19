import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

const DetailScreen: React.FC<string> = () => {
  const params = useLocalSearchParams()
  return <Text>Detail: { params.itemId } </Text>
}

export default DetailScreen