'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle({ setDark }: { setDark?: (dark: boolean) => void }) {
  const [mounted, setMounted] = useState(false);
  // Initialize with undefined to indicate we don't know the theme yet
  const [theme, setTheme] = useState<'light' | 'dark' | undefined>(undefined);

  useEffect(() => {
    // 1. Read the value the Layout Script already set
    const root = document.documentElement;
    const initialTheme = root.getAttribute('data-theme') as 'light' | 'dark';
    
    // 2. Set state to match
    setTheme(initialTheme || 'light');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !theme) return;
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
      if (setDark) {
        setDark(newTheme === 'dark');
      }
      setTheme(newTheme);
    };

  // Prevent hydration mismatch on the button itself
  if (!mounted || !theme) return <div className="w-10 h-10" />; // Optional: Render a placeholder to prevent layout shift

  return (
    <button
      onClick={toggleTheme}
      className="
        cursor-pointer relative flex items-center justify-center
        w-10 h-10 rounded-full
        card text-primary
        transition-all duration-500
        hover:scale-105 hover:shadow-md
      "
      aria-label="Toggle theme"
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      >
        <Moon strokeWidth={3} className="w-5 h-5 text-cyan-700" />
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
          theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`}
      >
        <Sun strokeWidth={3} className="w-5 h-5 text-yellow-500" />
      </div>
    </button>
  );
}