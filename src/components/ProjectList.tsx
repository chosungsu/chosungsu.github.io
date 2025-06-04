'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { PostData } from '@/utils/mdUtils';
import FormattedDate from './FormattedDate';

interface ProjectListProps {
  initialProjects: PostData[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [displayedProjects, setDisplayedProjects] = useState<PostData[]>(initialProjects.slice(0, 5));
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      const currentLength = displayedProjects.length;
      const nextProjects = initialProjects.slice(currentLength, currentLength + 5);
      if (nextProjects.length > 0) {
        setDisplayedProjects([...displayedProjects, ...nextProjects]);
      }
    }
  }, [inView, displayedProjects, initialProjects]);

  return (
    <div className="space-y-6">
      {displayedProjects.map((project) => (
        <Link
          href={`/projects/${project.id}`}
          key={project.id}
          className="block border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {project.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>
          <div className="flex justify-between items-center">
            <FormattedDate date={project.date} />
            <div className="flex space-x-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
      {displayedProjects.length < initialProjects.length && (
        <div ref={ref} className="h-10" />
      )}
    </div>
  );
} 