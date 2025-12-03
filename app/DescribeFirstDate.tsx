import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DescribeFirstDate() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe Your First Date</Text>

      <TextInput
        placeholder="What did you do with your partner on your first date?"
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Why that actvity specifcally?"
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="What moment made you think they're your future partner?"
        placeholderTextColor="#666"
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
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    color: '#fff'
  },
  input: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
    minHeight: 80,
    color: '#000'
  },
  button: {
    backgroundColor: '#ff8c00',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600'
  }
});
