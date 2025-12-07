import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const onSignup = async () => {
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);

      // NEW FLOW:
      // Signup → Splash → DescribePartner
      router.replace("/Splash?next=/DescribePartner");

    } catch (err: any) {
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>create your account.</Text>

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
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.button} onPress={onSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Login")}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const ORANGE = "#FF8C00";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingHorizontal: 24,
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
    color: "#ff8c00",
    marginBottom: 10,
  },
});




