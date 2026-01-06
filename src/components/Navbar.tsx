'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import Container from './Container';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProjectsActive = pathname?.startsWith('/projects');
  const isPostsActive = pathname?.startsWith('/posts');

  return (
    <div className={`fixed top-0 w-full z-[200] transition-all duration-200 ${
      isScrolled ? 'backdrop-blur-md bg-white/70 dark:bg-zinc-900/70' : 'bg-white dark:bg-zinc-900'
    } pointer-events-auto`}>
      <Container>
        <nav className="flex justify-between items-center h-16 relative z-[201] pointer-events-auto">
          <Link 
            href="/" 
            className="text-md font-bold text-gray-800 dark:text-white hover:opacity-80 transition-opacity relative z-[202] pointer-events-auto"
          >
            Sungsu Cho
          </Link>
          
          <div className="flex items-center space-x-4 relative z-[202] pointer-events-auto">
            <Link 
              href="/projects" 
              className={`text-md transition-colors relative z-[203] pointer-events-auto px-3 py-1.5 rounded-lg ${
                isProjectsActive
                  ? 'bg-gray-100 dark:bg-zinc-800/70 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/posts" 
              className={`text-md transition-colors relative z-[203] pointer-events-auto px-3 py-1.5 rounded-lg ${
                isPostsActive
                  ? 'bg-gray-100 dark:bg-zinc-800/70 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Posts
            </Link>
            <div className="relative z-[203] pointer-events-auto">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
} 