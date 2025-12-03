import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const KEYS = {
    COMPLETION: '@lovely_completion_',
    GESTURE_HISTORY: '@lovely_gesture_history',
    CURRENT_STREAK: '@lovely_current_streak',
    TODAYS_GESTURE: '@lovely_todays_gesture_',
};

/**
 * Get date string in YYYY-MM-DD format
 */
export const getDateString = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Save daily completion status
 */
export const saveDailyCompletion = async (date, gestureId, completed) => {
    try {
        const key = `${KEYS.COMPLETION}${date}`;
        const data = {
            date,
            gestureId,
            completed,
            timestamp: new Date().toISOString(),
        };
        await AsyncStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving completion:', error);
        return false;
    }
};

/**
 * Get daily completion status
 */
export const getDailyCompletion = async (date) => {
    try {
        const key = `${KEYS.COMPLETION}${date}`;
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting completion:', error);
        return null;
    }
};

/**
 * Save gesture history (recent picks for anti-repeat logic)
 */
export const saveGestureHistory = async (history) => {
    try {
        await AsyncStorage.setItem(KEYS.GESTURE_HISTORY, JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Error saving gesture history:', error);
        return false;
    }
};

/**
 * Get gesture history
 */
export const getGestureHistory = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.GESTURE_HISTORY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting gesture history:', error);
        return [];
    }
};

/**
 * Save today's gesture
 */
export const saveTodaysGesture = async (date, gesture) => {
    try {
        const key = `${KEYS.TODAYS_GESTURE}${date}`;
        await AsyncStorage.setItem(key, JSON.stringify(gesture));
        return true;
    } catch (error) {
        console.error('Error saving today\'s gesture:', error);
        return false;
    }
};

/**
 * Get today's gesture
 */
export const getTodaysGesture = async (date) => {
    try {
        const key = `${KEYS.TODAYS_GESTURE}${date}`;
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting today\'s gesture:', error);
        return null;
    }
};

/**
 * Calculate current streak (consecutive completed days)
 */
export const calculateStreak = async () => {
    try {
        let streak = 0;
        let currentDate = new Date();

        // Start from yesterday (today might not be completed yet)
        currentDate.setDate(currentDate.getDate() - 1);

        // Check backwards for consecutive completions
        for (let i = 0; i < 365; i++) { // Max check 1 year
            const dateStr = getDateString(currentDate);
            const completion = await getDailyCompletion(dateStr);

            if (completion && completion.completed) {
                streak++;
            } else {
                break; // Streak broken
            }

            // Move to previous day
            currentDate.setDate(currentDate.getDate() - 1);
        }

        // Check if today is completed too
        const todayStr = getDateString(new Date());
        const todayCompletion = await getDailyCompletion(todayStr);
        if (todayCompletion && todayCompletion.completed) {
            streak++;
        }

        return streak;
    } catch (error) {
        console.error('Error calculating streak:', error);
        return 0;
    }
};

/**
 * Save current streak to storage
 */
export const saveStreak = async (streak) => {
    try {
        await AsyncStorage.setItem(KEYS.CURRENT_STREAK, String(streak));
        return true;
    } catch (error) {
        console.error('Error saving streak:', error);
        return false;
    }
};

/**
 * Get stored streak
 */
export const getStoredStreak = async () => {
    try {
        const streak = await AsyncStorage.getItem(KEYS.CURRENT_STREAK);
        return streak ? parseInt(streak, 10) : 0;
    } catch (error) {
        console.error('Error getting stored streak:', error);
        return 0;
    }
};