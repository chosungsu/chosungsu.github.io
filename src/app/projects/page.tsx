'use client';

import Link from 'next/link';

export default function Projects() {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">프로젝트</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">프로젝트 1</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              프로젝트에 대한 상세한 설명이 들어갑니다.
            </p>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm">
                React
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded text-sm">
                Node.js
              </span>
            </div>
          </div>
          {/* 추가 프로젝트 카드들 */}
        </div>
      </div>
    </div>
  );
} 