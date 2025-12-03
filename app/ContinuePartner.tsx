import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ContinuePartner() {
  const router = useRouter();
  const [description, setDescription] = useState('');

  const handleNext = () => {
    console.log("User wrote:", description);
    router.push('/DescribeFirstDate');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Describe your partner in your own words</Text>

      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#777"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonTextPrimary}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={handleBack}>
          <Text style={styles.buttonTextSecondary}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',              // <-- make question visible
  },
  input: {
    width: '100%',
    minHeight: 120,
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#222',
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    color: '#fff',              // <-- typed text visible
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#ff8c00',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonSecondary: {
    backgroundColor: '#666',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonTextPrimary: {
    color: '#000',              // black on orange looks good
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#fff',              // white on gray
    fontSize: 16,
    fontWeight: '600',
  },
});


