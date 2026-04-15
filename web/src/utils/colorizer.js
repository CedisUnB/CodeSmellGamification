const colors = {
    // Categories
    "todos": "bg-teal-600 text-white shadow-md",
    "bloaters": "bg-green-600 text-white shadow-md",
    "object-orientation-abusers": "bg-blue-500 text-white shadow-md",
    "change-preventers": "bg-red-500 text-white shadow-md",
    "dispensables": "bg-purple-500 text-white shadow-md",
    "couplers": "bg-yellow-500 text-white shadow-md",
    "other-smells": "bg-orange-500 text-white shadow-md",

    // Difficulties
    "ALL": "bg-orange-500 text-white shadow-md",
    "EASY": "bg-green-500 text-white shadow-md",
    "MEDIUM": "bg-yellow-500 text-white shadow-md",
    "HARD": "bg-red-500 text-white shadow-md"
};

const alternateColors = {
    // Categories
    'bloaters': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'object-orientation-abusers': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'change-preventers': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'dispensables': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'couplers': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'other-smells': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',

    // Difficulties
    "EASY": "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
    "MEDIUM": "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
    "HARD": "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",
};


export const getColor = (key) => colors[key] || "bg-orange-500 text-white shadow-md";
export const getAlternateColor = (key) => alternateColors[key] || "text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/20";

