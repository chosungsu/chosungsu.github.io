import { getProjectPosts } from '@/utils/mdUtils';
import ProjectList from '@/components/ProjectList';

export default async function Projects() {
  const projects = await getProjectPosts();

  return (
    <div className="min-h-screen pb-4">
      <div className="max-w-3xl mx-auto">
        <ProjectList initialProjects={projects} />
      </div>
    </div>
  );
} 