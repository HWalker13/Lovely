/**
 * Gesture catalog for daily suggestions
 * Each gesture has an id, category, text, and preferences
 * Categories: Gifts, Words, Time, Acts, Physical
 */

export const GESTURE_CATEGORIES = {
    GIFTS: 'Gifts',
    WORDS: 'Words',
    TIME: 'Time',
    ACTS: 'Acts',
    PHYSICAL: 'Physical',
};

export const GESTURES = [
    {
        id: 'g1',
        category: GESTURE_CATEGORIES.WORDS,
        text: 'Leave her a quick note before you head out today.',
        preferences: ['quality_time', 'words_of_affirmation'],
    },
    {
        id: 'g2',
        category: GESTURE_CATEGORIES.TIME,
        text: 'Ask her about her day tonight — really listen.',
        preferences: ['quality_time'],
    },
    {
        id: 'g3',
        category: GESTURE_CATEGORIES.ACTS,
        text: 'Do that one chore she always handles without being asked.',
        preferences: ['acts_of_service'],
    },
    {
        id: 'g4',
        category: GESTURE_CATEGORIES.PHYSICAL,
        text: 'Hold her hand a little longer than usual today.',
        preferences: ['physical_touch'],
    },
    {
        id: 'g5',
        category: GESTURE_CATEGORIES.WORDS,
        text: 'Send her a text telling her something you love about her.',
        preferences: ['words_of_affirmation'],
    },
    {
        id: 'g6',
        category: GESTURE_CATEGORIES.GIFTS,
        text: 'Pick up her favorite snack on your way home.',
        preferences: ['receiving_gifts'],
    },
    {
        id: 'g7',
        category: GESTURE_CATEGORIES.TIME,
        text: 'Suggest a 20-minute walk together after dinner.',
        preferences: ['quality_time'],
    },
    {
        id: 'g8',
        category: GESTURE_CATEGORIES.ACTS,
        text: 'Make her morning coffee exactly how she likes it.',
        preferences: ['acts_of_service'],
    },
    {
        id: 'g9',
        category: GESTURE_CATEGORIES.PHYSICAL,
        text: 'Give her a genuine hug when you see her — no rush.',
        preferences: ['physical_touch'],
    },
    {
        id: 'g10',
        category: GESTURE_CATEGORIES.WORDS,
        text: 'Tell her one thing that made you think of her today.',
        preferences: ['words_of_affirmation'],
    },
    {
        id: 'g11',
        category: GESTURE_CATEGORIES.GIFTS,
        text: 'Bring home flowers — any kind, just because.',
        preferences: ['receiving_gifts'],
    },
    {
        id: 'g12',
        category: GESTURE_CATEGORIES.TIME,
        text: 'Put your phone away for an hour and just be with her.',
        preferences: ['quality_time'],
    },
    {
        id: 'g13',
        category: GESTURE_CATEGORIES.ACTS,
        text: "Take care of dinner tonight so she doesn't have to think about it.",
        preferences: ['acts_of_service'],
    },
    {
        id: 'g14',
        category: GESTURE_CATEGORIES.PHYSICAL,
        text: 'Rest your hand on her shoulder or back when you pass by.',
        preferences: ['physical_touch'],
    },
    {
        id: 'g15',
        category: GESTURE_CATEGORIES.WORDS,
        text: "Leave a voice message saying you're thinking of her.",
        preferences: ['words_of_affirmation'],
    },
];