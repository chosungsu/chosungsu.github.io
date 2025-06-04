'use client';

export default function CV() {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">이력서</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">학력</h2>
          <div className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">대학교 이름</h3>
              <p className="text-gray-600 dark:text-gray-300">전공</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2020 - 2024</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">경력</h2>
          <div className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">회사명</h3>
              <p className="text-gray-600 dark:text-gray-300">직책</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2023 - 현재</p>
              <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300">
                <li>주요 업무 내용 1</li>
                <li>주요 업무 내용 2</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">기술 스택</h2>
          <div className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">React</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Node.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Python</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 