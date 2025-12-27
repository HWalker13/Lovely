/**
 * Returns an array of date objects for the current week and next week
 * @returns {Array} - Array of date objects with day, date, fullDate and isToday properties
 */
type WeekDate = {
    day: string;
    date: number;
    fullDate: string;
    isToday: boolean;
};

export const getCurrentWeekDates = (): WeekDate[] => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dates: WeekDate[] = [];

    // Start from Sunday of current week and include 14 days (current week + next week)
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - currentDay + i);
        dates.push({
            day: date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 2),
            date: date.getDate(),
            fullDate: date.toDateString(),
            isToday: date.toDateString() === today.toDateString(),
        });
    }

    return dates;
};
