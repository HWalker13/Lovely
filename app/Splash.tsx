import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Splash() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start(() => {
      setTimeout(() => {
        router.replace('/first_Screen');
      }, 600);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/splash.png')}
        style={[styles.logo, { opacity: fade }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
});
