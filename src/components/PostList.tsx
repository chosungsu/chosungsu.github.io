'use client';

import { useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { PostData } from '@/utils/mdUtils';
import FormattedDate from './FormattedDate';
import { CalendarArrowDown, CalendarArrowUp, Search, Tag } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

interface PostListProps {
  initialPosts: PostData[];
}

export default function PostList({ initialPosts }: PostListProps) {
  // 한국어 버전 프로젝트만 필터링
  const koreanPosts = useMemo(() => {
    return initialPosts.filter(post => post.id.endsWith('-ko'));
  }, [initialPosts]);
  
  const [displayedPosts, setDisplayedPosts] = useState<PostData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isDescending, setIsDescending] = useState(true);
  const [selectedMainTag, setSelectedMainTag] = useState<string>('');
  const [showTagFilter, setShowTagFilter] = useState(false);
  const { ref, inView } = useInView();

  // 태그별 색상 매핑
  const getTagColor = (tag: string) => {
    const colorMap: { [key: string]: string } = {
      'paper review': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100',
      'math': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
      'ai': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100',
      'lecture': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100',
    };
    
    return colorMap[tag] || 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100';
  };

  // 모든 main 태그 추출 (각 포스트의 마지막 태그가 main 태그)
  const allMainTags = useMemo(() => {
    const mainTags = new Set<string>();
    koreanPosts.forEach(post => {
      if (post.tags.length > 0) {
        mainTags.add(post.tags[post.tags.length - 1]); // 마지막 태그가 main 태그
      }
    });
    return Array.from(mainTags).sort();
  }, [koreanPosts]);

  // 선택된 main 태그로 필터링된 포스트
  const filteredByMainTag = useMemo(() => {
    if (!selectedMainTag) return koreanPosts;
    return koreanPosts.filter(post => {
      if (post.tags.length > 0) {
        return post.tags[post.tags.length - 1] === selectedMainTag; // 마지막 태그가 main 태그
      }
      return false;
    });
  }, [koreanPosts, selectedMainTag]);

  // 검색어에 따른 필터링 (제목, 설명, 태그, 내용)
  const filteredBySearch = useMemo(() => {
    if (!searchTerm) return filteredByMainTag;
    const lower = searchTerm.toLowerCase();
    return filteredByMainTag.filter(post => {
      const inTitle = post.title.toLowerCase().includes(lower);
      const inDesc = post.description?.toLowerCase().includes(lower) ?? false;
      const inTags = post.tags.some(tag => tag.toLowerCase().includes(lower));
      const inContent = post.content?.toLowerCase().includes(lower) ?? false;
      return inTitle || inDesc || inTags || inContent;
    });
  }, [filteredByMainTag, searchTerm]);

  const sortPosts = useMemo(() => {
    return (posts: PostData[]) => {
      return [...posts].sort((a, b) => {
        const comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        return isDescending ? -comparison : comparison;
      });
    };
  }, [isDescending]);

  // 정렬된 포스트 - 메인 리스트용 (main 태그 필터 + 검색 필터 적용)
  const sortedPosts = useMemo(() => {
    return sortPosts(filteredBySearch);
  }, [filteredBySearch, sortPosts]);

  // 초기 프로젝트 로딩 및 필터/정렬 변경 시 업데이트
  useEffect(() => {
    setDisplayedPosts(sortedPosts.slice(0, 5));
  }, [sortedPosts]);

  // 무한 스크롤
  useEffect(() => {
    if (inView && displayedPosts.length < sortedPosts.length) {
      const nextPosts = sortedPosts.slice(
        displayedPosts.length,
        displayedPosts.length + 5
      );
      if (nextPosts.length > 0) {
        setDisplayedPosts(prev => [...prev, ...nextPosts]);
      }
    }
  }, [inView, displayedPosts.length, sortedPosts]);

  const toggleSortOrder = () => {
    setIsDescending(!isDescending);
  };

  const toggleTagFilter = () => {
    setShowTagFilter(!showTagFilter);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchTerm('');
    }
  };

  // 검색어 하이라이트 함수
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  // 프로젝트 ID에서 기본 ID 추출 (언어 코드 제거)
  const getBasePostId = (fullId: string) => {
    return fullId.replace(/-[a-z]{2}$/, '');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {/* 검색 아이콘 버튼 */}
          <button
            onClick={toggleSearch}
            className={`p-2 rounded-full transition-colors ${
              showSearch || searchTerm !== ''
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* 태그 필터 토글 버튼 */}
          <button
            onClick={toggleTagFilter}
            className={`p-2 rounded-full transition-colors ${
              showTagFilter || selectedMainTag !== ''
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <Tag className="w-4 h-4" />
          </button>
        </div>

        {/* 날짜 정렬 버튼 */}
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

      {/* 검색창 */}
      {showSearch && (
        <div className="mb-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 내용, 태그에서 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-900 placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {filteredBySearch.length}개의 포스트를 찾았습니다.
            </div>
          )}
        </div>
      )}

      {/* 태그 필터 chip UI */}
      {showTagFilter && (
        <div className="mb-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {/* All 태그 버튼 */}
            <button
              onClick={() => setSelectedMainTag('')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedMainTag === '' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
              }`}
            >
              All
            </button>

            {/* main 태그 필터 버튼들 */}
            {allMainTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedMainTag(selectedMainTag === tag ? '' : tag)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedMainTag === tag 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {displayedPosts.map((post) => (
          <Link
            href={`/posts/${getBasePostId(post.id)}`}
            key={post.id}
            className="block border dark:border-gray-700 rounded-lg p-6 h-50 overflow-hidden flex flex-col justify-between"
          >
            <h2
              className="text-md font-semibold mb-2 text-gray-900 dark:text-white"
              style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {highlightText(post.title, searchTerm)}
            </h2>
            {searchTerm && post.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {highlightText(post.description, searchTerm)}
              </p>
            )}
            <div className="flex justify-between items-center">
              <FormattedDate date={post.date} />
              <div className="flex space-x-2 items-center">
                {/* 태그 상세: 중간 이상 화면에서 표시 */}
                <div className="hidden sm:flex space-x-2">
                  {post.tags.map((tag, index) => {
                    const isMainTag = index === post.tags.length - 1; // 마지막 태그가 main 태그
                    return (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded text-sm ${
                          isMainTag 
                            ? `${getTagColor(tag)} font-medium` 
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                        }`}
                      >
                        {highlightText(tag, searchTerm)}
                      </span>
                    );
                  })}
                </div>
                {/* 태그 개수: 작은 화면에서만 표시 */}
                {post.tags.length > 0 && (
                  <span className="flex sm:hidden px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm">
                    +{post.tags.length}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
        {displayedPosts.length < sortedPosts.length && (
          <div ref={ref} className="h-10" />
        )}
      </div>
      <ScrollToTop />
    </div>
  );
} 