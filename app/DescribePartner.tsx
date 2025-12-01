import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DescribePartner() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe Your Partner</Text>

      <TextInput
        placeholder="Their personality..."
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Favorite things about them..."
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="How they make you feel..."
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/ContinuePartner')}
      >
        <Text style={styles.buttonText}>Submit (Placeholder)</Text>
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
