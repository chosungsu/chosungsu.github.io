import { getProjectPosts, getPostById } from '@/utils/mdUtils';
import { Metadata } from 'next';
import ProjectContent from '@/components/ProjectContent';

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const projects = await getProjectPosts();

  // 모든 프로젝트 ID(언어 코드 포함)를 수집하고, 기본 ID도 추가하여 중복 제거
  const ids = new Set<string>();
  projects.forEach(project => {
    ids.add(project.id); // project1-ko, project1-en 등
    const baseId = project.id.replace(/-[a-z]{2}$/, '');
    ids.add(baseId);    // project1 와 같이 언어 코드 없는 경로도 추가
  });

  return Array.from(ids).map(id => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 파라미터가 이미 언어 코드를 포함하고 있는지 확인, 없으면 기본 ko 로 설정
  const fullId = /-[a-z]{2}$/.test(params.id) ? params.id : `${params.id}-ko`;
  const project = await getPostById(fullId, 'projects');

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

export default function ProjectPage({ params }: Props) {
  // 파라미터가 이미 언어 코드를 포함하고 있는지 확인, 없으면 기본 ko 로 설정
  const fullId = /-[a-z]{2}$/.test(params.id) ? params.id : `${params.id}-ko`;
  return <ProjectContent id={fullId} />;
} 