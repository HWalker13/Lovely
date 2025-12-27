// app/ForgotPassword.tsx
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth } from '@/lib/auth';

export default function ForgotPassword() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleReset = async () => {
        setError(null);
        setSuccess(null);

        if (!email.trim()) {
            setError('Please enter your email.');
            return;
        }

        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email.trim());
            setSuccess('Password reset email sent. Check your inbox.');
        } catch (err: any) {
            if (err.code === 'auth/user-not-found') {
                setError('No account found with that email.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>reset password.</Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor="#777"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
            {success && <Text style={styles.successText}>{success}</Text>}

            <TouchableOpacity
                style={styles.button}
                onPress={handleReset}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.buttonText}>Send Reset Email</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.linkText}>Back to login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 28,
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '700',
        marginBottom: 20,
        textTransform: 'lowercase',
    },
    input: {
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#222',
        padding: 14,
        borderRadius: 10,
        color: '#fff',
        width: '100%',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#ff8c00',
        paddingVertical: 14, // matched to Login/Signup
        borderRadius: 10,
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: '#000',
        fontWeight: '700',
        fontSize: 16, // matching all other buttons
        textAlign: 'center',
    },
    errorText: {
        color: '#ff5c5c',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    successText: {
        color: '#4caf50',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    linkText: {
        color: '#ff8c00',
        marginTop: 16,
        fontSize: 14,
    },
});
