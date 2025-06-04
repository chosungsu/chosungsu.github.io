'use client';

interface FormattedDateProps {
  date: string;
}

export default function FormattedDate({ date }: FormattedDateProps) {
  return (
    <time className="text-sm text-gray-500 dark:text-gray-400">
      {new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </time>
  );
} 