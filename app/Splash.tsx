import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function Splash() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade animation
    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Watch auth state
    const unsub = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          // Logged in → home
          router.replace('/(tabs)/Homescreen');
        } else {
          // Logged out → LOGIN (NOT onboarding)
          router.replace('/Login');
        }
      }, 800);
    });

    return unsub;
  }, []);

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


