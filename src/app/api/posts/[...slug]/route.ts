import { getPostById, getBlogPosts } from '@/utils/mdUtils';
import { NextResponse } from 'next/server';
import path from 'path';

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  // 언어 코드가 포함된 실제 파일 ID만 정적 생성
  const ids = posts.map(post => post.id.split('/'));

  // 중복 제거 후 반환
  return Array.from(new Set(ids.map(id => JSON.stringify(id)))).map(id => ({ 
    slug: JSON.parse(id) 
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string[] } }
) {
  try {
    // slug 배열을 경로 문자열로 변환
    const pathId = params.slug.join('/');
    
    // getPostById 함수 사용
    let post = await getPostById(pathId, 'posts');
    
    // getPostById에서 찾지 못한 경우 언어 코드 추가 시도
    if (!post) {
      const hasLangCode = pathId.match(/-[a-z]{2}$/);
      if (!hasLangCode) {
        const postWithLang = await getPostById(`${pathId}-ko`, 'posts');
        if (postWithLang) {
          post = postWithLang;
        }
      }
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error loading post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 