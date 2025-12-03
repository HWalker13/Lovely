/**
 * Returns a greeting based on the current time of day
 * @returns {string} - greeting message (good morning/afternoon/evening/night)
 */
export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return 'good morning';
    } else if (hour >= 12 && hour < 17) {
        return 'good afternoon';
    } else if (hour >= 17 && hour < 21) {
        return 'good evening';
    } else {
        return 'good night';
    }
};