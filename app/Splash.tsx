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
    Animated.timing(fade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    const unsub = onAuthStateChanged(auth, user => {
      setTimeout(() => {

        // 1. If a next param exists → ALWAYS obey it
        if (next && next.length > 0) {
          router.replace(String(next));
          return;
        }

        // 2. No next param? Follow normal logic
        if (user) {
          router.replace('/(tabs)/Homescreen');
        } else {
          router.replace('/Onboarding');
        }
      }, 700);
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







