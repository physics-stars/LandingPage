'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Run only on client; this component is a client component ("use client")
    const stored = (typeof window !== 'undefined' && localStorage.getItem('theme')) as 'light' | 'dark' | null;
    const prefersDark =
      typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return stored || (prefersDark ? 'dark' : 'light');
  });

  // Sync DOM and localStorage whenever theme changes (no setState here)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

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
