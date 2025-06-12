import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiMail, FiArrowRight } from 'react-icons/fi';
import { getBlogPosts, getProjectPosts } from '@/utils/mdUtils';
import FormattedDate from '@/components/FormattedDate';

export default async function Home() {
  const allProjects = await getProjectPosts();
  const posts = await getBlogPosts();

  // 한국어 프로젝트만 필터링
  const projects = allProjects.filter(project => project.id.endsWith('-ko'));
  const latestProjects = projects.slice(0, 2);
  const latestPosts = posts.slice(0, 2);

  // 프로젝트 ID에서 기본 ID 추출 (언어 코드 제거)
  const getBaseProjectId = (fullId: string) => {
    return fullId.replace(/-[a-z]{2}$/, '');
  };

  return (
    <div className="min-h-screen py-16 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-48 h-48 relative rounded-full overflow-hidden">
            <Image
              src="/me.jpg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Sungsu Cho</h1>
            <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
              Computer Science Researcher | AI developer
            </p>
            <p className="text-md text-gray-600 dark:text-gray-300 mb-8">
              I am a computer science researcher and AI developer.
              I am interested in exploring new technologies and solving real-world problems.
            </p>
            
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="https://github.com/chosungsu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <FiGithub className="w-6 h-6" />
              </a>
              <a
                href="mailto:ski06043@gmail.com"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <FiMail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest Projects</h2>
            <Link 
              href="/projects"
              className="text-sm inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span>See more</span>
              <FiArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="space-y-6">
            {latestProjects.map((project) => (
              <Link 
                key={project.id} 
                href={`/projects/${getBaseProjectId(project.id)}`}
                className="block border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 h-50 overflow-hidden flex flex-col justify-between"
              >
                <h2
                  className="text-md font-semibold mb-2 text-gray-900 dark:text-white"
                  style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {project.title}
                </h2>
                <p
                  className="text-sm text-gray-600 dark:text-gray-300 mb-4"
                  style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <FormattedDate date={project.date} />
                  <div className="flex space-x-2 items-center">
                    {/* 태그 상세: 중간 이상 화면에서 표시 */}
                    <div className="hidden sm:flex space-x-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* 태그 개수: 작은 화면에서만 표시 */}
                    {project.tags.length > 0 && (
                      <span className="flex sm:hidden px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm">
                        +{project.tags.length}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest Blog Posts</h2>
            <Link 
              href="/blog"
              className="text-sm inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span>See more</span>
              <FiArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="space-y-6">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="block">
                <div className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <FormattedDate date={post.date} />
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 