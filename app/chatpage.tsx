import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  /* INTRO MESSAGE ANIMATION */
  const [showIntro, setShowIntro] = useState(true);
  const introOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(introOpacity, {
      toValue: 1,
      duration: 650,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  /* FLAME ANIMATIONS */
  const flameScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  /* AUTO-SCROLL */
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    /* Fade intro out on first message */
    if (showIntro) {
      setShowIntro(false);

      Animated.timing(introOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }

    /* Flame pulse */
    Animated.sequence([
      Animated.timing(flameScale, { toValue: 1.3, duration: 100, useNativeDriver: true }),
      Animated.timing(flameScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    /* Glow burst */
    glowOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(glowOpacity, { toValue: 0.8, duration: 120, useNativeDriver: true }),
      Animated.timing(glowOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();

    /* Sparks */
    spawnSparks();

    /* Add message */
    setMessages([...messages, input]);
    setInput('');

    /* Auto-scroll */
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 60);
  };

  const spawnSparks = () => {
    const newSparks: any[] = [];
    for (let i = 0; i < 5; i++) {
      newSparks.push({
        id: Date.now() + i,
        x: Math.random() * 40 - 20,
        y: Math.random() * -40 - 10,
      });
    }
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 350);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.arrow}>‹</Text>
      </TouchableOpacity>

      {/* Intro message centered */}
      {showIntro && (
        <Animated.View style={[styles.introContainer, { opacity: introOpacity }]}>
          <Text style={styles.introText}>
            Every gesture matters. {'\n'}
            What moment are you shaping today?
          </Text>
        </Animated.View>
      )}

      {/* Chat messages */}
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageBubble}>
            <Text style={styles.messageText}>{msg}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input bar */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Write something..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />

        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          {/* Glow */}
          <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />

          {/* Sparks */}
          {sparks.map((spark) => (
            <Animated.View
              key={spark.id}
              style={[
                styles.spark,
                {
                  transform: [
                    { translateX: spark.x },
                    { translateY: spark.y },
                  ],
                },
              ]}
            />
          ))}

          {/* Flame */}
          <Animated.View style={{ transform: [{ scale: flameScale }] }}>
            <Image
              source={require('../assets/images/flame.png')}
              style={styles.sendFlame}
              resizeMode="contain"
            />
          </Animated.View>

        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', paddingTop: 55 },

  backButton: { paddingLeft: 15, marginBottom: 5 },
  arrow: { color: 'white', fontSize: 38, fontWeight: '200' },

  /* INTRO MESSAGE */
  introContainer: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    zIndex: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  introText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    opacity: 0.92,
    lineHeight: 28,
  },

  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  messageBubble: {
    backgroundColor: '#3a3a3a',
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    borderBottomRightRadius: 4,
  },

  messageText: { color: 'white', fontSize: 16 },

  inputRow: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: 'black',
  },

  input: {
    flex: 1,
    height: 42,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#222',
    color: 'white',
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: '#1c1c1c4d',
    width: 50,
    height: 50,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },

  sendFlame: { width: 38, height: 38 },

  glow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,150,0,0.45)',
  },

  spark: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'orange',
  },
});













