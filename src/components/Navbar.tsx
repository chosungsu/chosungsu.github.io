'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Container from './Container';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-200 ${
      isScrolled ? 'backdrop-blur-md bg-white/70 dark:bg-gray-900/70' : 'bg-white dark:bg-gray-900'
    }`}>
      <Container>
        <nav className="flex justify-between items-center h-16">
          <Link href="/" className="text-md font-bold text-gray-800 dark:text-white">
            Sungsu Cho
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/projects" className="text-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Projects
            </Link>
            <Link href="/blog" className="text-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Blog
            </Link>
            <Link href="/cv" className="text-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              CV
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </div>
  );
} 