import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Splash() {
  const router = useRouter();
  const { next } = useLocalSearchParams<{ next?: string }>(); // 👈 get param
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        // If we have a "next" route, go there.
        // Otherwise fall back to Signup like before.
        const target = typeof next === 'string' && next.length > 0 ? next : 'Onboarding';
        router.replace(target);
      }, 600);
    });
  }, [fade, next, router]);

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
