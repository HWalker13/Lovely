import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo on top */}
      <Image
        source={require('../assets/images/flame.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('DescribePartner')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    width: '100%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});


