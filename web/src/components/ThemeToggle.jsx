import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex items-center gap-1 px-1 py-1 shadow-md group-hover:shadow-lg rounded-full bg-linear-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 transition-all duration-300"
      aria-label="Alternar tema"
    >
      <div
        className={`absolute h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <div className={`relative z-10 p-1 rounded-full transition-colors ${!isDark ? 'text-orange-400' : 'text-neutral-400'}`}>
        <FaSun size={14} />
      </div>
      <div className={`relative z-10 p-1 rounded-full transition-colors ${isDark ? 'text-teal-400' : 'text-neutral-400'}`}>
        <FaMoon size={14} />
      </div>
    </button>
  );
}