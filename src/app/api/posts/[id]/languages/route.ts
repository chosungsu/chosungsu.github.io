import { getAvailableLanguages, getBlogPosts } from '@/utils/mdUtils';
import { NextResponse } from 'next/server';

// 기본 ID에서 언어 코드 제거 (예: project1-ko -> project1)
function getBasePostId(fullId: string) {
  return fullId.replace(/-[a-z]{2}$/, '');
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  
  // 모든 프로젝트의 기본 ID 포함
  const baseIds = new Set<string>();
  
  posts.forEach(post => {
    const baseId = getBasePostId(post.id);
    baseIds.add(baseId);
  });
  
  return Array.from(baseIds).map(id => ({
    id: id,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ID가 이미 언어 코드를 포함하고 있는지 확인하고 제거
    const baseId = getBasePostId(params.id);
    const languages = await getAvailableLanguages(baseId);
    
    return NextResponse.json({ languages });
  } catch (error) {
    console.error('Error loading languages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 