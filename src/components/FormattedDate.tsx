'use client';

interface FormattedDateProps {
  date: string;
  className?: string;
}

export default function FormattedDate({ date, className = 'text-sm text-gray-500 dark:text-gray-400' }: FormattedDateProps) {
  return (
    <time className={className}>
      {new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </time>
  );
} 