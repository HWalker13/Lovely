// app/Splash.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useAuth } from '../AuthProvider';

export default function Splash() {
  const router = useRouter();
  const { next } = useLocalSearchParams<{ next?: string }>();
  const { user } = useAuth();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      // 1) If a "next" param is passed (e.g. from Signup), always respect it
      if (next) {
        router.replace(String(next));
        return;
      }

      // 2) Otherwise, route based on auth state:
      //    - Logged in  -> go to Homescreen
      //    - Not logged -> go to Login
      if (user) {
        router.replace('/(tabs)/Homescreen'); // or /HomeScreen if that's the exact route
      } else {
        router.replace('/Login');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [next, router, fade, user]);

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
