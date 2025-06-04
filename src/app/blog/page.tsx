'use client';

import Link from 'next/link';

export default function Blog() {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">블로그</h1>
        <div className="space-y-8">
          <article className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              블로그 포스트 제목
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              블로그 포스트에 대한 상세한 설명이 들어갑니다.
              이 부분은 포스트의 미리보기 내용을 보여줍니다.
            </p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2024년 1월 1일
              </div>
              <Link 
                href="/blog/post-1"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                자세히 보기
              </Link>
            </div>
          </article>
          {/* 추가 블로그 포스트들 */}
        </div>
      </div>
    </div>
  );
} 