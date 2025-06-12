import { getPostById, getBlogPosts } from '@/utils/mdUtils';
import { NextResponse } from 'next/server';

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  // 언어 코드가 포함된 실제 파일 ID만 정적 생성
  const ids = posts.map(post => post.id);

  // 중복 제거 후 반환
  return Array.from(new Set(ids)).map(id => ({ id }));
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ID가 이미 언어 코드를 포함하고 있는지 확인
    const hasLangCode = params.id.match(/-[a-z]{2}$/);
    const postId = hasLangCode ? params.id : `${params.id}-ko`;

    const post = await getPostById(postId, 'posts');

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