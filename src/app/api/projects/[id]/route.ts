import { getPostById, getProjectPosts } from '@/utils/mdUtils';
import { NextResponse } from 'next/server';

// 기본 ID에서 언어 코드 제거 (예: project1-ko -> project1)
function getBaseProjectId(fullId: string) {
  return fullId.replace(/-[a-z]{2}$/, '');
}

export async function generateStaticParams() {
  const projects = await getProjectPosts();
  
  // 모든 프로젝트의 기본 ID와 언어 버전 ID 모두 포함
  const allIds = new Set<string>();
  
  projects.forEach(project => {
    // 기본 ID 추가
    const baseId = getBaseProjectId(project.id);
    allIds.add(baseId);
    // 언어 버전 ID 추가
    allIds.add(project.id);
  });
  
  return Array.from(allIds).map(id => ({
    id: id,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ID가 이미 언어 코드를 포함하고 있는지 확인
    const hasLangCode = params.id.match(/-[a-z]{2}$/);
    const projectId = hasLangCode ? params.id : `${params.id}-ko`;
    
    const project = await getPostById(projectId, 'projects');
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error loading project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 