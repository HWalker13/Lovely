import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TEXT_SIZE } from '../../constants/typography';

type Gesture = {
    id: string;
    text: string;
};

type TodaysGestureProps = {
    gesture: Gesture | null;
    onPlanPress: () => void;
    onMarkDone: () => void;
};

/**
 * Today's Gesture component
 * Displays the daily gesture suggestion with check button and plan button
 */
const TodaysGesture = ({ gesture, onPlanPress, onMarkDone }: TodaysGestureProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const checkScale = new Animated.Value(1);

    // Handle check animation
    const handleCheck = () => {
        setIsChecked(true);

        // Animate check mark
        Animated.sequence([
            Animated.timing(checkScale, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(checkScale, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(checkScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Delay before marking as done
        setTimeout(() => {
            onMarkDone();
        }, 600);
    };

    if (!gesture) return null;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Today's Gesture</Text>

                <TouchableOpacity
                    style={styles.checkButton}
                    onPress={handleCheck}
                    activeOpacity={0.7}
                    disabled={isChecked}
                >
                    <Animated.View style={{ transform: [{ scale: checkScale }] }}>
                        <Ionicons
                            name={isChecked ? "checkmark-circle" : "ellipse-outline"}
                            size={24}
                            color={isChecked ? "#4ade80" : COLORS.textPrimary}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>

            {/* Main gesture text */}
            <Text style={styles.gestureText}>{gesture.text}</Text>

            {/* Plan with Lovely button */}
            <TouchableOpacity
                style={styles.planButton}
                onPress={onPlanPress}
                activeOpacity={0.7}
            >
                <Text style={styles.planButtonText}>Plan with Lovely</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    sectionTitle: {
        ...TEXT_SIZE.S,
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        paddingLeft: 5,
    },
    gestureText: {
        ...TEXT_SIZE.L,
        color: COLORS.textPrimary,
        marginBottom: 28,
    },
    checkButton: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    planButton: {
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    planButtonText: {
        ...TEXT_SIZE.S,
        color: COLORS.textPrimary,
    },
});

export default TodaysGesture;
