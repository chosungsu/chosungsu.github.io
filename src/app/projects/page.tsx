import { getProjectPosts } from '@/utils/mdUtils';
import ProjectList from '@/components/ProjectList';

export default async function Projects() {
  const projects = await getProjectPosts();

  return (
    <div className="min-h-screen py-16 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <ProjectList initialProjects={projects} />
      </div>
    </div>
  );
} 