import { getAvailableLanguages, getBlogPosts } from '@/utils/mdUtils';
import { NextResponse } from 'next/server';
import path from 'path';

// 기본 ID에서 언어 코드 제거 (예: project1-ko -> project1)
// 하위 폴더 구조를 고려하여 파일명만 처리
function getBasePostId(fullId: string) {
  const fileName = path.basename(fullId);
  return fileName.replace(/-[a-z]{2}$/, '');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      );
    }
    
    // ID가 이미 언어 코드를 포함하고 있는지 확인하고 제거
    const baseId = getBasePostId(id);
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