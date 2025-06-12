import { getBlogPosts } from '@/utils/mdUtils';
import PostList from '@/components/PostList';

export default async function Posts() {
  const postList = (await getBlogPosts()).filter(post => post.id.endsWith('-ko'));

  return (
    <div className="min-h-screen pb-4">
      <div className="max-w-3xl mx-auto">
        <PostList initialPosts={postList} />
      </div>
    </div>
  );
} 