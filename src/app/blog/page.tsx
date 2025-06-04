import { getBlogPosts } from '@/utils/mdUtils';
import Link from 'next/link';
import FormattedDate from '@/components/FormattedDate';

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen py-16 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        {posts.map((post) => (
          <article key={post.id} className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {post.description}
            </p>
            <div className="flex justify-between items-center">
              <FormattedDate date={post.date} />
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/blog/${post.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 