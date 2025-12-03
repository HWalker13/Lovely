import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TEXT_SIZE } from '../../constants/typography';

/**
 * Completion Message component
 * Shows completion phrase as a simple header with pulsing heart
 */
const CompletionMessage = ({ gesture, phrase, visible, onUndo, canUndo }) => {
    // Heart scale animation using Animated
    const heartScale = useRef(new Animated.Value(1)).current;

    // Heart pulse animation
    useEffect(() => {
        if (visible && phrase) {
            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(heartScale, {
                        toValue: 1.2,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heartScale, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            );

            pulseAnimation.start();

            return () => {
                pulseAnimation.stop();
            };
        }
    }, [visible, phrase, heartScale]);

    if (!visible || !phrase) return null;

    return (
        <View style={styles.container}>
            {/* Completion Phrase */}
            <Text style={styles.completionText}>{phrase}</Text>

            {/* Heart Icon */}
            <Animated.View
                style={[
                    styles.heartContainer,
                    { transform: [{ scale: heartScale }] }
                ]}
            >
                <Ionicons name="heart" size={48} color="#ff6b9d" />
            </Animated.View>

            {/* Undo Button (if available) */}
            {canUndo && (
                <TouchableOpacity
                    style={styles.undoButton}
                    onPress={onUndo}
                    activeOpacity={0.7}
                >
                    <Text style={styles.undoButtonText}>Undo</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: 'center',
    },
    completionText: {
        ...TEXT_SIZE.XL,
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 32,
    },
    heartContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    undoButton: {
        marginTop: 0,
        paddingVertical: 0,
        paddingHorizontal: 24,
    },
    undoButtonText: {
        ...TEXT_SIZE.S,
        color: 'rgba(255, 255, 255, 0.5)',
        textDecorationLine: 'underline',
    },
});

export default CompletionMessage;