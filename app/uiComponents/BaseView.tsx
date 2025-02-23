// import React, { ReactNode, useEffect, useRef, useState } from 'react';
// import { View, Animated, Easing, StyleSheet, Dimensions, useAnimatedValue, SafeAreaView } from 'react-native';
// import { Color, Gradient } from '../uiComponents/Colors';
// import { LinearGradient } from 'expo-linear-gradient';

// const BaseMenuView = ({children, animatedOpacity}:{children: ReactNode, animatedOpacity: Animated.Value}) => {

//   const fadeOut: (callback: Animated.EndCallback) => void = (callback) => {
//       Animated.timing(animatedOpacity, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start(callback);
//     }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.View style={{ opacity: animatedOpacity }}>
//         <LinearGradient
//           colors={Gradient.greyBackground}
//           style={styles.gradient}
//         >
//           {children}
//         </LinearGradient>
//       </Animated.View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: '#2c3e50',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     margin: 'auto'
//   },
//   gradient: {
//     paddingHorizontal: 16
//   },
// });


// export default BaseMenuView;