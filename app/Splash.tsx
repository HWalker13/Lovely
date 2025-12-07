import { useLocalSearchParams, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { auth } from '../firebaseConfig';

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

    // Auth state check
    const unsub = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        // If a "next" param was passed, ALWAYS follow it
        if (next) {
          router.replace(next);
          return;
        }

        if (user) {
          router.replace('/(tabs)/Homescreen');
        } else {
          router.replace('/Onboarding');
        }
      }, 800);
    });

    return unsub;
  }, [next]);

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


