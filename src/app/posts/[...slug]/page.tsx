import { getBlogPosts, getPostById } from '@/utils/mdUtils';
import { Metadata } from 'next';
import PostContent from '@/components/PostContent';
import path from 'path';

interface Props {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  // 한국어(-ko) 게시물의 기본 ID만 정적으로 생성
  // 하위 폴더 구조를 고려하여 경로를 유지
  const ids = posts
    .filter(post => post.id.endsWith('-ko') || !/-[a-z]{2}$/.test(post.id))
    .map(post => {
      if (post.id.endsWith('-ko')) {
        // 하위 폴더가 있는 경우 경로를 유지
        const baseId = post.id.replace(/-ko$/, '');
        return baseId.split('/');
      }
      return post.id.split('/');
    });

  const uniqueIds = Array.from(new Set(ids.map(id => JSON.stringify(id)))).map(id => ({ 
    slug: JSON.parse(id) 
  }));

  return uniqueIds;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 하위 폴더 구조를 고려하여 ID 매칭
  const posts = await getBlogPosts();
  
  // slug 배열을 경로 문자열로 변환
  const pathId = params.slug.join('/');
  
  // 정확한 ID 매칭 시도
  let fullId = /-[a-z]{2}$/.test(pathId) ? pathId : `${pathId}-ko`;
  let post = posts.find(p => p.id === fullId);
  
  // 정확한 매칭이 없으면 파일명만으로 매칭 시도 (하위 폴더 고려)
  if (!post) {
    const fileName = path.basename(pathId);
    const koreanFileName = `${fileName}-ko`;
    post = posts.find(p => {
      const postFileName = path.basename(p.id);
      return postFileName === koreanFileName;
    });
    if (post) {
      fullId = post.id;
    }
  }

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  // 하위 폴더 구조를 고려하여 ID 매칭
  const posts = await getBlogPosts();
  
  // slug 배열을 경로 문자열로 변환
  const pathId = params.slug.join('/');
  
  // 정확한 ID 매칭 시도
  let fullId = /-[a-z]{2}$/.test(pathId) ? pathId : `${pathId}-ko`;
  let post = posts.find(p => p.id === fullId);
  
  // 정확한 매칭이 없으면 파일명만으로 매칭 시도 (하위 폴더 고려)
  if (!post) {
    const fileName = path.basename(pathId);
    const koreanFileName = `${fileName}-ko`;
    post = posts.find(p => {
      const postFileName = path.basename(p.id);
      return postFileName === koreanFileName;
    });
    if (post) {
      fullId = post.id;
    }
  }
  
  return <PostContent id={fullId} />;
} 