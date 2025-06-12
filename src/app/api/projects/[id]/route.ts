import { getPostById, getProjectPosts } from '@/utils/mdUtils';
import { NextResponse } from 'next/server';

// 기본 ID에서 언어 코드 제거 (예: project1-ko -> project1)
function getBaseProjectId(fullId: string) {
  return fullId.replace(/-[a-z]{2}$/, '');
}

export async function generateStaticParams() {
  const projects = await getProjectPosts();

  // 언어 코드가 포함된 실제 파일 ID만 정적 생성
  const ids = projects.map(project => project.id);

  // 중복 제거
  return Array.from(new Set(ids)).map(id => ({ id }));
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