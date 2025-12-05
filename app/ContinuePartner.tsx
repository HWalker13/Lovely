import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ORANGE = '#ff8c00';
const BLACK = '#000';

export default function ContinuePartner() {
  const router = useRouter();
  const [description, setDescription] = useState('');

  const handleNext = () => {
    console.log('User wrote:', description);
    router.push('/DescribeFirstDate');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Describe your partner in your own words
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Type here..."
        placeholderTextColor="#777"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    width: '100%',
    minHeight: 120,
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#111',
    padding: 14,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 24,
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#444',
    paddingVertical: 14,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
