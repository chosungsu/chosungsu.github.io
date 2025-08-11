'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import FormattedDate from './FormattedDate';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';
import ScrollToTop from './ScrollToTop';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

interface PostContentProps {
  id: string;
}

export default function PostContent({ id }: PostContentProps) {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { t, currentLocale } = useLanguage();
  
  // 기본 프로젝트 ID (언어 코드 제외)
  const baseId = id.replace(/-[a-z]{2}$/, '');

  // 태그별 색상 매핑
  const getTagColor = (tag: string) => {
    const colorMap: { [key: string]: string } = {
      'paper review': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100',
      'math': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
      'ai': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100',
      'lecture': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100',
    };
    
    return colorMap[tag] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100';
  };

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      setError(null);
      try {
        // 다중 세그먼트 경로를 처리하기 위해 slug 배열로 변환
        const requestId = `${baseId}-${currentLocale}`;
        const slugArray = requestId.split('/');
        let postResponse = await fetch(`/api/posts/${slugArray.join('/')}`);
        // 해당 언어 문서가 없으면 반대 언어로 폴백
        if (!postResponse.ok) {
          const fallbackLang = currentLocale === 'ko' ? 'en' : 'ko';
          const fallbackId = `${baseId}-${fallbackLang}`;
          const fbSlugArray = fallbackId.split('/');
          postResponse = await fetch(`/api/posts/${fbSlugArray.join('/')}`);
        }
        if (!postResponse.ok) throw new Error(`HTTP error! status: ${postResponse.status}`);

        const postData = await postResponse.json();
        if (postData.post) setPost(postData.post);
        else throw new Error('Post data not found');
      } catch (error) {
        console.error('Failed to load post:', error);
        setError(error instanceof Error ? error.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id, currentLocale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{t('common.error')}</p>
          <button
            onClick={() => router.push('/posts')}
            className="text-gray-600 dark:text-gray-400 hover:underline"
          >
            {t('common.backToList')}
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen py-8">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-between items-center gap-4">
              <FormattedDate date={post.date} className="text-sm text-gray-600 dark:text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => {
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
            </div>
            
            {/* 언어 변경 버튼 - 제목 아래에 배치 */}
            <div className="mt-4">
              <LanguageToggle />
            </div>
          </div>
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />
              ),
              p: ({ ...props }) => (
                <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-gray-900 dark:text-white not-prose">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-gray-900 dark:text-white not-prose">
                  {children}
                </em>
              ),
              ul: ({ ...props }) => (
                <ul className="list-disc list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="ml-4" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-700 dark:text-gray-300" {...props} />
              ),
              code: ({ className, children }) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                return isInline ? (
                  <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
                    {children}
                  </code>
                ) : (
                  <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                    <code className={className}>
                      {String(children).replace(/\n$/, '')}
                    </code>
                  </pre>
                );
              },
              img: ({ src, alt }) => (
                src ? (
                  <Image
                    src={src}
                    alt={alt || ''}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="my-8 h-auto w-full rounded-lg"
                  />
                ) : null
              ),
              a: ({ href, ...props }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  {...props}
                />
              ),
              hr: () => (
                <hr className="my-8 border-gray-200 dark:border-gray-700" />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      <ScrollToTop />
    </div>
  );
} 