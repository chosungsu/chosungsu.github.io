import { getBlogPosts } from '@/utils/mdUtils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getBlogPosts();
    
    // 포스트 ID와 태그만 반환 (네비게이션에 필요한 최소 정보)
    const postsList = posts.map(post => ({
      id: post.id,
      title: post.title,
      date: post.date,
      tags: post.tags || [],
    }));
    
    return NextResponse.json({ posts: postsList });
  } catch (error) {
    console.error('Error loading posts list:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

