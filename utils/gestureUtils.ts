import { GESTURES, GESTURE_CATEGORIES } from '../constants/gestures';
import {
    getDateString,
    getTodaysGesture,
    saveTodaysGesture,
    getGestureHistory,
    saveGestureHistory
} from './storageUtils';

type Gesture = {
    id: string;
    category: string;
    text: string;
    preferences: string[];
};

type GestureHistoryEntry = {
    date: string;
    gestureId: string;
    category: string;
};

const GESTURE_LIST = GESTURES as Gesture[];
const GESTURE_CATEGORY_MAP = GESTURE_CATEGORIES as Record<string, string>;

/**
 * Get local midnight for a given date
 */
export const getLocalMidnight = (date: Date = new Date()): Date => {
    const midnight = new Date(date);
    midnight.setHours(0, 0, 0, 0);
    return midnight;
};

/**
 * Get next midnight
 */
export const getNextMidnight = (date: Date = new Date()): Date => {
    const midnight = getLocalMidnight(date);
    midnight.setDate(midnight.getDate() + 1);
    return midnight;
};

/**
 * Check if current time is after a given timestamp's midnight
 */
export const isAfterMidnight = (timestamp: string | number | Date): boolean => {
    const now = new Date();
    const targetDate = new Date(timestamp);
    const nextMidnight = getNextMidnight(targetDate);
    return now >= nextMidnight;
};

/**
 * Check if we can still undo today's completion
 * (before midnight of current day)
 */
export const canUndoToday = (): boolean => {
    const now = new Date();
    const nextMidnight = getNextMidnight(now);
    return now < nextMidnight;
};

/**
 * Generate a daily gesture with anti-repeat logic
 * Avoids gestures from the same category used within last 7-14 days
 */
export const generateDailyGesture = async (
    preferences: string[] = []
): Promise<Gesture> => {
    try {
        // Get gesture history
        const history = await getGestureHistory();

        // Calculate which categories to avoid
        const now = new Date();
        const recentCategories = new Set();

        history.forEach((entry: GestureHistoryEntry) => {
            const entryDate = new Date(entry.date);
            const daysDiff = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));

            // Avoid categories from last 7-14 days
            if (daysDiff >= 0 && daysDiff <= 14) {
                recentCategories.add(entry.category);
            }
        });

        // Filter available gestures
        let availableGestures = GESTURE_LIST.filter(gesture => {
            // Avoid recently used categories
            if (recentCategories.has(gesture.category) && recentCategories.size < Object.keys(GESTURE_CATEGORY_MAP).length - 1) {
                return false;
            }

            // Check if gesture matches any preferences (if provided)
            if (preferences.length > 0) {
                return gesture.preferences.some(pref => preferences.includes(pref));
            }

            return true;
        });

        // If too restrictive, just avoid last 7 days
        if (availableGestures.length === 0) {
            const veryRecentCategories = new Set();
            history.forEach((entry: GestureHistoryEntry) => {
                const entryDate = new Date(entry.date);
                const daysDiff = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));
                if (daysDiff >= 0 && daysDiff <= 7) {
                    veryRecentCategories.add(entry.category);
                }
            });

            availableGestures = GESTURE_LIST.filter(gesture =>
                !veryRecentCategories.has(gesture.category)
            );
        }

        // If still no gestures, just pick any
        if (availableGestures.length === 0) {
            availableGestures = GESTURE_LIST;
        }

        // Pick random gesture from available
        const randomIndex = Math.floor(Math.random() * availableGestures.length);
        const selectedGesture = availableGestures[randomIndex];

        // Update history
        const todayStr = getDateString();
        const newHistory = [
            {
                date: todayStr,
                gestureId: selectedGesture.id,
                category: selectedGesture.category,
            },
            ...history.slice(0, 20), // Keep last 20 entries
        ];

        await saveGestureHistory(newHistory);

        return selectedGesture;
    } catch (error) {
        console.error('Error generating gesture:', error);
        // Fallback to first gesture
        return GESTURE_LIST[0];
    }
};

/**
 * Get or create today's gesture
 * Checks AsyncStorage first, generates if missing
 */
export const getOrCreateTodaysGesture = async (
    preferences: string[] = []
): Promise<Gesture> => {
    try {
        const todayStr = getDateString();

        // Check if we already have today's gesture
        let gesture = await getTodaysGesture(todayStr);

        // If not, generate a new one
        if (!gesture) {
            gesture = await generateDailyGesture(preferences);
            await saveTodaysGesture(todayStr, gesture);
        }

        return gesture;
    } catch (error) {
        console.error('Error getting/creating today\'s gesture:', error);
        // Fallback
        return GESTURE_LIST[0];
    }
};
