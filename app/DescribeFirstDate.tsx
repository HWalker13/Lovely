import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ORANGE = '#ff8c00';
const BLACK = '#000';

export default function DescribeFirstDate() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe Your First Date</Text>

      <TextInput
        placeholder="What did you do with your partner on your first date?"
        placeholderTextColor="#777"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Why that activity specifically?"
        placeholderTextColor="#777"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="What moment made you think they're your future partner?"
        placeholderTextColor="#777"
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/first_Screen')}
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
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '700',
    color: '#fff',
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    minHeight: 80,
    color: '#fff',
  },
  button: {
    backgroundColor: ORANGE,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
