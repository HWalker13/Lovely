import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { getGreeting } from '../../utils/greetingUtils';
import { getCurrentWeekDates } from '../../utils/dateUtils';
import { COLORS } from '../../constants/colors';

/**
 * Header component for the Home screen
 * 
 * @param {Object} props Component props
 * @param {number} props.tasksCompleted Number of completed tasks to display in pill
 * @param {string} props.selectedDate Currently selected date string
 * @param {Function} props.onDateSelect Function to call when a date is selected
 */
const HomeHeader = ({ tasksCompleted, selectedDate, onDateSelect }) => {
    const weekDates = getCurrentWeekDates();

    // Animation for fire icon
    const flameScale = useRef(new Animated.Value(1)).current;
    const flameOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Subtle pulsing animation
        const scaleAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(flameScale, {
                    toValue: 1.15,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(flameScale, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );

        // Subtle flicker effect
        const opacityAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(flameOpacity, {
                    toValue: 0.8,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(flameOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ])
        );

        scaleAnimation.start();
        opacityAnimation.start();

        return () => {
            scaleAnimation.stop();
            opacityAnimation.stop();
        };
    }, []);

    return (
        <View style={styles.header}>
            {/* Top Row: Task Counter, Greeting, Profile */}
            <View style={styles.headerTopRow}>
                {/* Task Counter Pill */}
                <View style={[styles.taskCounterPill, styles.highlightBox]}>
                    <Animated.View
                        style={{
                            transform: [{ scale: flameScale }],
                            opacity: flameOpacity,
                        }}
                    >
                        <Ionicons name="flame" size={18} color={COLORS.accent} />
                    </Animated.View>
                    <Text style={styles.taskCounterText}>{tasksCompleted}</Text>
                </View>

                {/* Greeting */}
                <Text style={styles.greetingText}>{getGreeting()}.</Text>

                {/* Profile Icon */}
                <View style={styles.profileIcon}>
                    <Ionicons name="person-circle" size={40} color={COLORS.textPrimary} />
                </View>
            </View>

            {/* Calendar Row */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.calendarContainer}
            >
                {weekDates.map((dateObj, index) => {
                    const isSelected = selectedDate === dateObj.fullDate;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.calendarDay,
                                styles.highlightBox,                 // 🟧 box around every day
                                isSelected && styles.calendarDaySelected, // extra highlight for selected
                            ]}
                            onPress={() => onDateSelect(dateObj.fullDate)}
                        >
                            <Text
                                style={[
                                    styles.calendarDayText,
                                    isSelected && styles.calendarDayTextSelected,
                                ]}
                            >
                                {dateObj.day}
                            </Text>
                            <Text
                                style={[
                                    styles.calendarDateText,
                                    isSelected && styles.calendarDateTextSelected,
                                ]}
                            >
                                {dateObj.date}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    highlightBox: {
        borderWidth: 2,
        borderColor: COLORS.accent,
        borderRadius: 12, // matches calendarDay
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    taskCounterPill: {
        flexDirection: 'row',
        backgroundColor: COLORS.glassBg,
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        minWidth: 36,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    taskCounterText: {
        color: COLORS.textPrimary,
        fontSize: 18,
        fontWeight: '600',
    },
    greetingText: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textPrimary,
        flex: 1,
        textAlign: 'center',
    },
    profileIcon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarContainer: {
        paddingVertical: 5,
        gap: 12,
    },
    calendarDay: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        minWidth: 40,
    },
    calendarDaySelected: {
        backgroundColor: 'rgba(255, 138, 0, 0.15)', // soft orange fill behind the border
    },
    calendarDayText: {
        fontSize: 14,
        color: COLORS.textMuted,
        fontWeight: '500',
        marginBottom: 4,
    },
    calendarDayTextSelected: {
        color: COLORS.textPrimary,
        fontWeight: '700',
    },
    calendarDateText: {
        fontSize: 18,
        color: COLORS.textMuted,
        fontWeight: '600',
    },
    calendarDateTextSelected: {
        color: COLORS.textPrimary,
        fontWeight: '700',
    },
});

export default HomeHeader;