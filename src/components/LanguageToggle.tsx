'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageToggle() {
  const { toggleLanguage, isKorean, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      title={isKorean ? t('common.switchToEnglish') : t('common.switchToKorean')}
      aria-label={isKorean ? t('common.switchToEnglish') : t('common.switchToKorean')}
    >
      <Globe className="w-4 h-4" />
      <span>{isKorean ? 'EN' : 'KO'}</span>
    </button>
  );
}
