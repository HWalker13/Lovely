// app/Onboarding.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Onboarding() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/Signup'); // change this if your login route is different
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('../assets/images/flame.png')} // adjust path if needed
                style={styles.logo}
            />

            {/* App name */}
            <Text style={styles.title}>Lovely</Text>

            {/* Short description */}
            <Text style={styles.subtitle}>
                A simple way to strengthen your relationship
                one day at a time.
            </Text>

            {/* Supporting text */}
            <Text style={styles.bodyText}>
                Answer daily questions, learn about each other,
                and keep your connection 🔥 without overthinking it.
            </Text>

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Get Started button */}
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <Text style={styles.smallHint}>
                You can always change your info later in settings.
            </Text>
        </View>
    );
}

const ORANGE = '#FF6A00';
const BLACK = '#000000';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK,
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 40,
    },
    logo: {
        width: 72,
        height: 72,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: ORANGE,
        textAlign: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    bodyText: {
        fontSize: 15,
        color: '#CCCCCC',
        textAlign: 'center',
        lineHeight: 22,
        marginHorizontal: 8,
    },
    button: {
        backgroundColor: ORANGE,
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        shadowColor: ORANGE,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 4,
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',
    },
    smallHint: {
        fontSize: 12,
        color: '#777777',
        textAlign: 'center',
    },
});
