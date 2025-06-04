'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      aria-label="테마 변경"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <FiMoon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
            조성수
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Projects
            </Link>
            <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Blog
            </Link>
            <Link href="/cv" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              CV
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 