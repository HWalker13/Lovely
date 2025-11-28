import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const [bgColor, setBgColor] = useState('#000000');
  const router = useRouter();

  const handleYes = () => {
    setBgColor('#4CAF50');
    router.push('/DescribePartner'); // happy green (you can change the color)
  };

  const handleNo = () => {
    setBgColor('#B00020'); // sad red (you can change the color)
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.question}>Do you have a significant other?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleYes}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNo}>
          <Text style={styles.buttonText}>No</Text>
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
  },

  question: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },

  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
});
