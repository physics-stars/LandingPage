"use client";

import { Star } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function PublicHeader() {
  return (
    <header className="relative z-50 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4 sm:gap-6">
      {/* === Logo and Title === */}
      <div className="flex flex-col items-start gap-1 shrink-0">
        {/* Logo box */}
        <div className="flex items-center gap-2">
          <Star className="w-8 h-8 text-theme" fill="currentColor" />
          <div className="flex flex-col ">
            <span className="text-2xl font-bold gradient-text">Physics Stars</span>
            <p className="text-secondary">Domina la física descobrint-la tú mateix.</p>
          </div>
        </div>
      </div>

      {/* === Right section === */}
      <nav className="flex items-center gap-4 sm:gap-5 text-sm text-slate-400">
        <ThemeToggle />
      </nav>
    </header>
  );
}
