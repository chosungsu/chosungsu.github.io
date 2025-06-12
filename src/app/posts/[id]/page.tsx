import { getBlogPosts, getPostById } from '@/utils/mdUtils';
import { Metadata } from 'next';
import PostContent from '@/components/PostContent';

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  // 한국어(-ko) 게시물의 기본 ID만 정적으로 생성
  const ids = posts
    .filter(post => post.id.endsWith('-ko') || !/-[a-z]{2}$/.test(post.id))
    .map(post => post.id.endsWith('-ko') ? post.id.replace(/-ko$/, '') : post.id);

  return Array.from(new Set(ids)).map(id => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fullId = /-[a-z]{2}$/.test(params.id) ? params.id : `${params.id}-ko`;
  const post = await getPostById(fullId, 'posts');

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

export default function PostPage({ params }: Props) {
  const fullId = /-[a-z]{2}$/.test(params.id) ? params.id : `${params.id}-ko`;
  return <PostContent id={fullId} />;
} 