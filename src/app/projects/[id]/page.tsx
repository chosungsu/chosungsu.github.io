import { getProjectPosts, getPostById } from '@/utils/mdUtils';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import FormattedDate from '@/components/FormattedDate';

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const projects = await getProjectPosts();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getPostById(params.id, 'projects');

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getPostById(params.id, 'projects');

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 bg-white dark:bg-gray-900">
      <article className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {project.title}
        </h1>
        <div className="flex justify-between items-center mb-8">
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
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
} 