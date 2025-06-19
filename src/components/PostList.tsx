'use client';

import { useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { PostData } from '@/utils/mdUtils';
import FormattedDate from './FormattedDate';
import { CalendarArrowDown, CalendarArrowUp, Search, ChevronRight, Tag } from 'lucide-react';
import ScrollToTop from './ScrollToTop';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
  const [showSearchModal, setShowSearchModal] = useState(false);
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

  // Dialog가 닫힐 때 검색어 초기화
  const handleOpenChange = (open: boolean) => {
    setShowSearchModal(open);
    if (!open) {
      setSearchTerm('');
    }
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

  const sortPosts = useMemo(() => {
    return (posts: PostData[]) => {
      return [...posts].sort((a, b) => {
        const comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        return isDescending ? -comparison : comparison;
      });
    };
  }, [isDescending]);

  // 검색어에 따른 필터링 (제목, 설명, 태그) - Dialog용
  const filteredPosts = useMemo(() => {
    if (!searchTerm) return [];
    const lower = searchTerm.toLowerCase();
    return koreanPosts.filter(post => {
      const inTitle = post.title.toLowerCase().includes(lower);
      const inDesc = post.description?.toLowerCase().includes(lower) ?? false;
      const inTags = post.tags.some(tag => tag.toLowerCase().includes(lower));
      return inTitle || inDesc || inTags;
    });
  }, [koreanPosts, searchTerm]);

  // 정렬된 포스트 - 메인 리스트용 (main 태그 필터 적용)
  const sortedPosts = useMemo(() => {
    return sortPosts(filteredByMainTag);
  }, [filteredByMainTag, sortPosts]);

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
            onClick={() => setShowSearchModal(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Search className="w-4 h-4 text-gray-600 dark:text-gray-300" />
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

      {/* 태그 필터 chip UI */}
      {showTagFilter && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
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
                    ? getTagColor(tag)
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
              {post.title}
            </h2>
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
                        {tag}
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

      {/* 검색 Dialog */}
      <Dialog open={showSearchModal} onOpenChange={handleOpenChange}>
        <DialogContent className="p-0 max-h-[90vh] flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700">
          <DialogTitle className="sr-only">Search Posts</DialogTitle>
          <DialogDescription className="sr-only">
            Search posts by title, description, or tags
          </DialogDescription>
          {/* Input & ESC row */}
          <div className="relative px-2 pt-4 pb-2 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search posts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-3 text-base text-gray-900 dark:text-gray-100 bg-transparent placeholder-gray-400 border-0 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          {/* list container */}
          <div className="px-6 pb-6 overflow-y-auto flex-grow">
            {searchTerm === '' ? (
              <p className="text-center text-gray-500 py-10">No recent searches</p>
            ) : filteredPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No posts found.</p>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/posts/${getBasePostId(post.id)}`}
                      className="flex justify-between items-center py-3 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded text-gray-900 dark:text-gray-100"
                      onClick={() => handleOpenChange(false)}
                    >
                      <span className="truncate max-w-sm">{post.title}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 