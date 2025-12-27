import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { putPartnerProfile } from "@/lib/api";
import { auth } from "@/lib/auth";

const ORANGE = "#ff8c00";
const BLACK = "#000";

export default function FirstScreen() {
  const router = useRouter();

  const [foods, setFoods] = useState("");
  const [movies, setMovies] = useState("");
  const [other, setOther] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFinishOnboarding = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      setLoading(true);

      const payload = {
        context: {
          user_name: user.email ?? "user",
          partner_name: "Partner",
          relationship_stage: "dating",
        },
        preferences: [
          foods.trim(),
          movies.trim(),
          other.trim(),
        ].filter(Boolean),
        notes: "onboarding complete",
      };
      await putPartnerProfile(user, payload);

      router.replace("HomeScreen");
    } catch (_err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe Your Partner's Favorites</Text>

      <TextInput
        placeholder="Their favorite foods..."
        placeholderTextColor="#777"
        style={styles.input}
        multiline
        value={foods}
        onChangeText={setFoods}
      />

      <TextInput
        placeholder="Favorite movies or shows..."
        placeholderTextColor="#777"
        style={styles.input}
        multiline
        value={movies}
        onChangeText={setMovies}
      />

      <TextInput
        placeholder="Other favorites (music, hobbies, places)..."
        placeholderTextColor="#777"
        style={styles.input}
        multiline
        value={other}
        onChangeText={setOther}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleFinishOnboarding}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Continue"}
        </Text>
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
    color: "#fff",
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    padding: 14,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: ORANGE,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});
