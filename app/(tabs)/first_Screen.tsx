import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ORANGE = '#ff8c00';
const BLACK = '#000';

export default function FirstScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe Your Partner's Favorites</Text>

      <TextInput
        placeholder="Their favorite foods..."
        placeholderTextColor="#777"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Favorite movies or shows..."
        placeholderTextColor="#777"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Other favorites (music, hobbies, places)..."
        placeholderTextColor="#777"
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: 'Splash',
            params: { next: 'Homescreen' },
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
    backgroundColor: BLACK,
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
    backgroundColor: ORANGE,
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
