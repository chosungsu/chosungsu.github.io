'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 지원하는 언어 목록
export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

// 기본 언어 설정
export const defaultLocale: Locale = 'ko';

// 언어별 표시명
export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English'
};

// 언어별 메시지
export const messages = {
  ko: {
    common: {
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      backToList: '목록으로 돌아가기',
      minRead: '분 읽기',
      switchToEnglish: '영어로 변경',
      switchToKorean: '한국어로 변경',
      prevPost: '이전 포스트',
      nextPost: '다음 포스트',
      seeMore: '자세히 보기'
    },
    navigation: {
      projects: '프로젝트',
      posts: '포스트',
      home: '홈'
    },
    tags: {
      paperReview: '논문 리뷰',
      math: '수학',
      ai: '인공지능',
      lecture: '강의'
    }
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      backToList: 'Back to list',
      minRead: 'min read',
      switchToEnglish: 'Switch to English',
      switchToKorean: 'Switch to Korean',
      prevPost: 'Previous post',
      nextPost: 'Next post',
      seeMore: 'See more'
    },
    navigation: {
      projects: 'Projects',
      posts: 'Posts',
      home: 'Home'
    },
    tags: {
      paperReview: 'Paper Review',
      math: 'Mathematics',
      ai: 'Artificial Intelligence',
      lecture: 'Lecture'
    }
  }
};

interface LanguageContextType {
  currentLocale: Locale;
  toggleLanguage: () => void;
  changeLanguage: (locale: Locale) => void;
  isKorean: boolean;
  isEnglish: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // localStorage에서 저장된 언어 불러오기
    const savedLocale = localStorage.getItem('language') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  const changeLanguage = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem('language', locale);
  };

  const toggleLanguage = () => {
    const currentIndex = locales.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % locales.length;
    const nextLocale = locales[nextIndex];
    changeLanguage(nextLocale);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[currentLocale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // 키를 찾을 수 없으면 원본 키 반환
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value: LanguageContextType = {
    currentLocale,
    toggleLanguage,
    changeLanguage,
    isKorean: currentLocale === 'ko',
    isEnglish: currentLocale === 'en',
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
