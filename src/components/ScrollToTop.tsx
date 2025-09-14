'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * 화면 우하단에 나타나는 "위로 이동" 버튼
 * 1. 스크롤이 일정 거리(300px) 이상 내려가면 보여짐
 * 2. 클릭 시 부드럽게 맨 위로 스크롤
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-400 text-white hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600 transition-colors"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
} 