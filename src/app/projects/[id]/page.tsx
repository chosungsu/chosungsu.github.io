import { getPostById } from '@/utils/mdUtils';
import { Metadata } from 'next';
import ProjectContent from '@/components/ProjectContent';

interface Props {
  params: {
    id: string;
  };
}

// 프로젝트별 URL 매핑 (ProjectList와 동일한 설정)
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

export async function generateStaticParams() {
  // projectConfigs의 키를 기반으로 정적 파라미터 생성
  const projectIds = Object.keys(projectConfigs);
  
  // 각 프로젝트 ID와 언어 코드 조합 생성
  const ids = new Set<string>();
  projectIds.forEach(projectId => {
    ids.add(projectId); // 기본 ID
    ids.add(`${projectId}-ko`); // 한국어 버전
    ids.add(`${projectId}-en`); // 영어 버전
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