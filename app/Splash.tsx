// app/Splash.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function Splash() {
  const router = useRouter();
  const { next } = useLocalSearchParams<{ next?: string }>();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      // If a "next" param was passed, ALWAYS follow it
      if (next) {
        router.replace(next);
        return;
      }

      // Otherwise, go to the real home screen for logged-in users
      router.replace('/(tabs)/Homescreen'); // or '/(tabs)/HomeScreen' if that's the exact route name
    }, 800);

    return () => clearTimeout(timer);
  }, [next, router, fade]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/flame.png')}
        style={[styles.logo, { opacity: fade }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
  },
});
