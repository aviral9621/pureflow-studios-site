
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand/50
        ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}
      `}
      aria-label="Toggle Dark Mode"
    >
      <div
        className={`
          absolute top-1 left-1 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
          ${theme === 'dark' 
            ? 'translate-x-5 bg-gray-900 text-brand-light' 
            : 'translate-x-0 bg-white text-orange-400'}
        `}
      >
        {theme === 'dark' ? (
          <Moon className="w-3 h-3" fill="currentColor" />
        ) : (
          <Sun className="w-3 h-3" fill="currentColor" />
        )}
      </div>
    </button>
  );
};
