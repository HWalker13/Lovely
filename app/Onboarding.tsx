import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/flame.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Lovely</Text>

      <Text style={styles.subtitle}>
        A simple way to strengthen your relationship one day at a time.
      </Text>

      <Text style={styles.bodyText}>
        Answer daily questions, learn about each other,
        and keep your connection 🔥 without overthinking it.
      </Text>

      <View style={{ flex: 1 }} />

      {/* Go to SIGNUP */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/Signup')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Go to LOGIN */}
      <TouchableOpacity onPress={() => router.push('/Login')}>
        <Text style={styles.loginHint}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const ORANGE = '#ff8c00';
const BLACK = '#000000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: ORANGE,
    textAlign: 'center',
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 15,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  loginHint: {
    color: '#777777',
    textAlign: 'center',
    marginTop: 6,
    fontSize: 13,
  },
});

