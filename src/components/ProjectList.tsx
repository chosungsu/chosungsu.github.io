'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { PostData } from '@/utils/mdUtils';
import FormattedDate from './FormattedDate';
import { CalendarArrowDown, CalendarArrowUp } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

interface ProjectListProps {
  initialProjects: PostData[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  // 한국어 버전 프로젝트만 필터링
  const koreanProjects = initialProjects.filter(project => project.id.endsWith('-ko'));
  
  const [displayedProjects, setDisplayedProjects] = useState<PostData[]>([]);
  const [isDescending, setIsDescending] = useState(true);
  const { ref, inView } = useInView();

  const sortProjects = (projects: PostData[], descending: boolean) => {
    return [...projects].sort((a, b) => {
      const comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      return descending ? -comparison : comparison;
    });
  };

  // 초기 프로젝트 로딩
  useEffect(() => {
    const sortedProjects = sortProjects(koreanProjects, isDescending);
    setDisplayedProjects(prev => {
      // 이미 표시된 프로젝트가 있다면 정렬만 다시 수행
      if (prev.length > 0) {
        return sortProjects(prev, isDescending);
      }
      // 처음 로딩하는 경우에만 첫 5개 항목 표시
      return sortedProjects.slice(0, 5);
    });
  }, [isDescending]); // koreanProjects는 props에서 직접 계산되므로 의존성에서 제외

  // 무한 스크롤
  useEffect(() => {
    if (inView && displayedProjects.length < koreanProjects.length) {
      const sortedProjects = sortProjects(koreanProjects, isDescending);
      const nextProjects = sortedProjects.slice(
        displayedProjects.length,
        displayedProjects.length + 5
      );
      if (nextProjects.length > 0) {
        setDisplayedProjects(prev => [...prev, ...nextProjects]);
      }
    }
  }, [inView, displayedProjects.length, isDescending]); // koreanProjects는 props에서 직접 계산되므로 의존성에서 제외

  const toggleSortOrder = () => {
    setIsDescending(!isDescending);
  };

  // 프로젝트 ID에서 기본 ID 추출 (언어 코드 제거)
  const getBaseProjectId = (fullId: string) => {
    return fullId.replace(/-[a-z]{2}$/, '');
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span>Date</span>
          {isDescending ? (
            <CalendarArrowUp className="w-4 h-4" />
          ) : (
            <CalendarArrowDown className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="space-y-6">
        {displayedProjects.map((project) => (
          <Link
            href={`/projects/${getBaseProjectId(project.id)}`}
            key={project.id}
            className="block border dark:border-gray-700 rounded-lg p-6 h-50 overflow-hidden flex flex-col justify-between"
          >
            <h2
              className="text-md font-semibold mb-2 text-gray-900 dark:text-white"
              style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {project.title}
            </h2>
            <p
              className="text-sm text-gray-600 dark:text-gray-300 mb-4"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {project.description}
            </p>
            <div className="flex justify-between items-center">
              <FormattedDate date={project.date} />
              <div className="flex space-x-2 items-center">
                {/* 태그 상세: 중간 이상 화면에서 표시 */}
                <div className="hidden sm:flex space-x-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* 태그 개수: 작은 화면에서만 표시 */}
                {project.tags.length > 0 && (
                  <span className="flex sm:hidden px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm">
                    +{project.tags.length}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
        {displayedProjects.length < koreanProjects.length && (
          <div ref={ref} className="h-10" />
        )}
      </div>
      <ScrollToTop />
    </div>
  );
} 