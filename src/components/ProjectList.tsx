'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Code, ArrowRight } from 'lucide-react';
import ScrollToTop from './ScrollToTop';
import { useLanguage } from '@/hooks/useLanguage';

interface GitHubProjectData {
  projectId: string;
  title: string;
  description: string;
  language: string | null;
  githubUrl: string;
  websiteUrl?: string;
}

// 프로젝트별 URL 매핑
const projectConfigs: { [projectId: string]: { github: string; website?: string } } = {
  'mkad': {
    github: 'https://github.com/chosungsu/time-series-anomaly-detection',
  },
  't5n2': {
    github: 'https://github.com/chosungsu/Text-normalization-ko-number-part',
  },
  'lab_it': {
    github: 'https://github.com/chosungsu/LaB_it',
  },
};

export default function ProjectList() {
  const [projects, setProjects] = useState<GitHubProjectData[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<GitHubProjectData[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const { ref, inView } = useInView();
  const { t } = useLanguage();

  // GitHub API로 저장소 정보 가져오기
  const fetchGitHubData = async (githubUrl: string, projectId: string): Promise<GitHubProjectData | null> => {
    if (loading[projectId]) {
      return null; // 이미 로딩 중이면 스킵
    }

    setLoading(prev => ({ ...prev, [projectId]: true }));

    try {
      // GitHub URL에서 owner/repo 추출
      const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        console.error(`Invalid GitHub URL: ${githubUrl}`);
        return null;
      }

      const [, owner, repo] = match;
      const repoPath = `${owner}/${repo.replace(/\.git$/, '')}`;

      // GitHub API 직접 호출 (CORS 허용)
      const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const config = projectConfigs[projectId];
        
        return {
          projectId,
          title: data.name || repo, // 저장소 이름을 제목으로 사용
          description: data.description || '', // 설명이 없으면 빈 문자열
          language: data.language || null,
          githubUrl: data.html_url || githubUrl,
          // GitHub API의 homepage 필드를 우선 사용, 없으면 하드코딩된 website 사용
          websiteUrl: data.homepage || config?.website,
        };
      } else {
        console.error(`GitHub API error for ${projectId}:`, response.status);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching GitHub data for ${projectId}:`, error);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [projectId]: false }));
    }
  };

  // 모든 프로젝트 데이터 로딩
  useEffect(() => {
    const loadAllProjects = async () => {
      const projectIds = Object.keys(projectConfigs);
      const projectPromises = projectIds.map(projectId => {
        const config = projectConfigs[projectId];
        if (config.github) {
          return fetchGitHubData(config.github, projectId);
        }
        return Promise.resolve(null);
      });

      const results = await Promise.all(projectPromises);
      const validProjects = results.filter((p): p is GitHubProjectData => p !== null);
      setProjects(validProjects);
      setDisplayedProjects(validProjects.slice(0, 6));
    };

    loadAllProjects();
  }, []);

  // 무한 스크롤
  useEffect(() => {
    if (inView && displayedProjects.length < projects.length) {
      const nextProjects = projects.slice(
        displayedProjects.length,
        displayedProjects.length + 6
      );
      if (nextProjects.length > 0) {
        setDisplayedProjects(prev => [...prev, ...nextProjects]);
      }
    }
  }, [inView, displayedProjects.length, projects]);

  return (
    <div className="space-y-12">
      {/* 프로젝트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedProjects.map((project) => {
          return (
            <div
              key={project.projectId}
              className="group relative"
            >
              <div className="h-full p-4 rounded-xl border-2 border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 group-hover:border-purple-400/50 dark:group-hover:border-purple-500/50 transition-all duration-300 flex flex-col relative overflow-hidden">
                {/* 하단 보라색 그라데이션 오버레이 - 호버 시에만 표시 */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-500/10 via-purple-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* 컨텐츠 */}
                <div className="relative z-10 flex flex-col h-full">
                {/* 제목 */}
                <div className="mb-1.5">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                    {project.title}
                  </h2>
                </div>

                {/* 사용 언어 */}
                {project.language && (
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-700 dark:text-gray-300">
                    <Code className="w-3.5 h-3.5" />
                    <span>{project.language}</span>
                  </div>
                )}

                {/* 프로젝트 설명 */}
                {project.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                    {project.description}
                  </p>
                )}

                {/* 액션 버튼들 */}
                <div className="flex items-center justify-end gap-2 mt-auto pt-3 border-t border-gray-200 dark:border-zinc-800">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects & Experiments 섹션 */}
      {displayedProjects.length >= 6 && (
        <div className="space-y-4 pt-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Projects & Experiments
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Browse more projects
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <span>Explore more projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* 무한 스크롤 트리거 */}
      {displayedProjects.length < projects.length && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
        </div>
      )}

      <ScrollToTop />
    </div>
  );
}
