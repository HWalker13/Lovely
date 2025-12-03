import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function FirstScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe Your Partner's Favorites</Text>

      <TextInput
        placeholder="Their favorite foods..."
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Favorite movies or shows..."
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Other favorites (music, hobbies, places)..."
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: 'Splash',          // go to Splash screen
            params: { next: 'Homescreen' } // Splash will then route to Homescreen
          })
        }
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 25,
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});
