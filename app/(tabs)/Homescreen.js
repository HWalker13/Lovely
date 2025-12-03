import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeHeader from '../../components/home/HomeHeader';
import TodaysGesture from '../../components/home/TodaysGesture';
import CompletionMessage from '../../components/home/CompletionMessage';
import UpcomingMoments from '../../components/home/UpcomingMoments';
import LovelyTips from '../../components/home/LovelyTips';
import RecentMoments from '../../components/home/RecentMoments';

import { getOrCreateTodaysGesture, canUndoToday } from '../../utils/gestureUtils';
import {
    getDateString,
    getDailyCompletion,
    saveDailyCompletion,
    calculateStreak,
    saveStreak,
} from '../../utils/storageUtils';
import { COMPLETION_PHRASES } from '../../constants/completionPhrases';

/**
 * Home screen component
 * Displays daily gesture with completion flow
 */
const HomeScreen = ({ onNavigateToAsk }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [todaysGesture, setTodaysGesture] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [completionPhrase, setCompletionPhrase] = useState('');
    const [canUndo, setCanUndo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Seeded upcoming moments (temporary)
    const upcomingMoments = [
        {
            id: '1',
            title: 'Anniversary Dinner',
            dateTime: 'Sat, Nov 8 · 7:30 PM',
            location: 'Le Petit Coeur, SF',
            note: 'She loves the corner table.',
            icon: 'restaurant',
        },
        {
            id: '2',
            title: 'Weekend Getaway',
            dateTime: 'Nov 15–17',
            location: 'Carmel-by-the-Sea',
            note: 'Pack her favorite sweater.',
            icon: 'airplane',
        },
        {
            id: '3',
            title: "Maya's Birthday",
            dateTime: 'Fri, Nov 21 · 6:00 PM',
            location: 'Home — game night',
            note: 'Get the polaroid film.',
            icon: 'gift',
        },
    ];

    // Opacity animations for smooth transition between gesture and completion message
    const gestureOpacity = useRef(new Animated.Value(1)).current;
    const messageOpacity = useRef(new Animated.Value(0)).current;

    // Load today's gesture and completion status on mount
    useEffect(() => {
        loadTodaysData();
    }, []);

    const loadTodaysData = async () => {
        try {
            setIsLoading(true);

            // Get or create today's gesture
            const gesture = await getOrCreateTodaysGesture();
            setTodaysGesture(gesture);

            // Check completion status
            const todayStr = getDateString();
            const completion = await getDailyCompletion(todayStr);

            if (completion && completion.completed) {
                setIsCompleted(true);
                // Pick a random completion phrase
                const randomPhrase = COMPLETION_PHRASES[
                    Math.floor(Math.random() * COMPLETION_PHRASES.length)
                ];
                setCompletionPhrase(randomPhrase);
            }

            // Check if we can undo
            setCanUndo(canUndoToday());

            // Calculate and set streak
            const streak = await calculateStreak();
            setTasksCompleted(streak);
            await saveStreak(streak);

            setIsLoading(false);
            // Set initial opacities after loading based on completion state
            if (completion && completion.completed) {
                gestureOpacity.setValue(0);
                messageOpacity.setValue(1);
            } else {
                gestureOpacity.setValue(1);
                messageOpacity.setValue(0);
            }
        } catch (error) {
            console.error('Error loading today\'s data:', error);
            setIsLoading(false);
        }
    };

    const handleMarkDone = async () => {
        try {
            // Begin fade-out of gesture
            Animated.timing(gestureOpacity, {
                toValue: 0,
                duration: 220,
                useNativeDriver: true,
            }).start(async () => {
                // Pick random completion phrase
                const randomPhrase = COMPLETION_PHRASES[
                    Math.floor(Math.random() * COMPLETION_PHRASES.length)
                ];
                setCompletionPhrase(randomPhrase);

                // Switch view
                setIsCompleted(true);

                // Persist changes (non-blocking for animation)
                try {
                    const todayStr = getDateString();
                    await saveDailyCompletion(todayStr, todaysGesture.id, true);
                    const newStreak = await calculateStreak();
                    setTasksCompleted(newStreak);
                    await saveStreak(newStreak);
                    setCanUndo(canUndoToday());
                } catch (persistError) {
                    console.error('Error persisting completion:', persistError);
                }

                // Fade-in completion message
                messageOpacity.setValue(0);
                Animated.timing(messageOpacity, {
                    toValue: 1,
                    duration: 220,
                    useNativeDriver: true,
                }).start();
            });
        } catch (error) {
            console.error('Error marking done:', error);
        }
    };

    const handleUndo = async () => {
        try {
            // Fade out completion message, then switch and fade in gesture
            Animated.timing(messageOpacity, {
                toValue: 0,
                duration: 220,
                useNativeDriver: true,
            }).start(async () => {
                // Reset completion state
                setIsCompleted(false);
                setCompletionPhrase('');

                // Persist changes (non-blocking for animation)
                try {
                    const todayStr = getDateString();
                    await saveDailyCompletion(todayStr, todaysGesture.id, false);
                    const newStreak = await calculateStreak();
                    setTasksCompleted(newStreak);
                    await saveStreak(newStreak);
                } catch (persistError) {
                    console.error('Error persisting undo:', persistError);
                }

                // Fade-in gesture
                gestureOpacity.setValue(0);
                Animated.timing(gestureOpacity, {
                    toValue: 1,
                    duration: 220,
                    useNativeDriver: true,
                }).start();
            });
        } catch (error) {
            console.error('Error undoing:', error);
        }
    };

    const handlePlanPress = () => {
        if (onNavigateToAsk) {
            onNavigateToAsk();
        }
    };


    if (isLoading) {
        return (
            <SafeAreaView style={styles.screenFull}>
                <HomeHeader
                    tasksCompleted={tasksCompleted}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                />
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView style={styles.screenFull}>
            <HomeHeader
                tasksCompleted={tasksCompleted}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
            />

            <ScrollView
                style={styles.scrollContent}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {!isCompleted ? (
                    <Animated.View style={{ opacity: gestureOpacity }}>
                        <TodaysGesture
                            gesture={todaysGesture}
                            onPlanPress={handlePlanPress}
                            onMarkDone={handleMarkDone}
                        />
                    </Animated.View>
                ) : (
                    <Animated.View style={{ opacity: messageOpacity }}>
                        <CompletionMessage
                            gesture={todaysGesture}
                            phrase={completionPhrase}
                            visible={isCompleted}
                            onUndo={handleUndo}
                            canUndo={canUndo}
                        />
                    </Animated.View>
                )}

                {/* Upcoming Moments Section */}
                <UpcomingMoments
                    moments={upcomingMoments}
                    onDetails={() => { }}
                    onEdit={() => { }}
                    onMenu={() => { }}
                />

                {/* Lovely Tips Section */}
                <LovelyTips />

                {/* Recent Moments Section */}
                <RecentMoments />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenFull: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
});

export default HomeScreen;