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
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    // Remove intro
    if (showIntro) {
      setShowIntro(false);
      Animated.timing(introOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }

    // Flame pulse
    Animated.sequence([
      Animated.timing(flameScale, { toValue: 1.3, duration: 110, useNativeDriver: true }),
      Animated.timing(flameScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    // Glow flash
    glowOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(glowOpacity, { toValue: 0.8, duration: 120, useNativeDriver: true }),
      Animated.timing(glowOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();

    // Add the message
    setMessages((prev) => [...prev, input]);
    setInput('');

    // Auto-scroll
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 80);
  };

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.arrow}>‹</Text>
      </TouchableOpacity>

      {/* Intro message */}
      {showIntro && (
        <Animated.View style={[styles.introContainer, { opacity: introOpacity }]}>
          <Text style={styles.introText}>
            Every gesture matters. {'\n'}
            What moment are you shaping today?
          </Text>
        </Animated.View>
      )}

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((m, i) => (
          <View key={i} style={styles.messageBubble}>
            <Text style={styles.messageText}>{m}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input row */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Write something..."
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />

        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          {/* Glow flash */}
          <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />

          {/* Flame */}
          <Animated.View style={{ transform: [{ scale: flameScale }] }}>
            <View style={styles.flameWrapper}>
              <Image
                source={require('../assets/images/flame.png')}
                style={styles.flameImg}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

/* ----------------------------- STYLES ---------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 55,
  },

  backButton: {
    paddingLeft: 15,
    marginBottom: 5,
  },

  arrow: {
    color: 'white',
    fontSize: 38,
    fontWeight: '200',
  },

  /* INTRO MESSAGE */
  introContainer: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 50,
  },

  introText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 28,
    opacity: 0.92,
  },

  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  messageBubble: {
    backgroundColor: '#3a3a3a',
    padding: 12,
    marginBottom: 12,
    borderRadius: 14,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
    maxWidth: '80%',
  },

  messageText: {
    color: 'white',
    fontSize: 16,
  },

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
    backgroundColor: '#222',
    color: 'white',
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  sendButton: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c4d',
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },

  flameWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flameImg: {
    width: '100%',
    height: '100%',
  },

  glow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'rgba(255,150,0,0.45)',
  },
});















