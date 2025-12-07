import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/Splash?next=/(tabs)/Homescreen"); // adjust route as needed
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>welcome back.</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Signup")}>
        <Text style={styles.link}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const ORANGE = "#FF8C00";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 28,
    marginBottom: 24,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    color: "white",
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  link: {
    color: ORANGE,
    marginTop: 18,
    textAlign: "center",
    fontSize: 14,
  },
  error: {
    color: "#ff4d4d",
    marginBottom: 10,
  },
});

