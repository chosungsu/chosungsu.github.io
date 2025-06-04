'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-48 h-48 relative rounded-full overflow-hidden">
            <Image
              src="/me.jpg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">조성수</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              컴퓨터 과학 연구원 | AI 엔지니어
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              인공지능과 웹 기술을 연구하고 개발하는 엔지니어입니다.
              새로운 기술을 탐구하고 실제 문제를 해결하는 것에 관심이 많습니다.
            </p>
            
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="https://github.com/chosungsu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <FiGithub className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/chosungsu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <FiMail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">최근 프로젝트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/projects/project-1" className="block">
              <div className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">프로젝트 제목</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  프로젝트에 대한 간단한 설명이 들어갑니다.
                </p>
              </div>
            </Link>
            {/* 추가 프로젝트 카드들 */}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">최근 블로그 포스트</h2>
          <div className="space-y-6">
            <Link href="/blog/post-1" className="block">
              <div className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">블로그 포스트 제목</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  블로그 포스트에 대한 간단한 설명이 들어갑니다.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  2024년 1월 1일
                </p>
              </div>
            </Link>
            {/* 추가 블로그 포스트 카드들 */}
          </div>
        </div>
      </div>
    </div>
  );
} 