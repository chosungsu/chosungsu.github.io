import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface PostData {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

let cachedProjects: PostData[] | null = null;
let cachedBlogPosts: PostData[] | null = null;

interface ProjectInfo {
  id: string;
  lang: string;
  baseId: string;
}

function parseProjectFileName(fileName: string): ProjectInfo {
  const match = fileName.match(/^(.+?)(?:-([a-z]{2}))?\.md$/);
  if (!match) return { id: fileName, lang: 'ko', baseId: fileName };
  
  const [, baseId, lang] = match;
  return {
    id: fileName.replace(/\.md$/, ''),
    lang: lang || 'ko',
    baseId,
  };
}

// 재귀적으로 디렉토리 내의 모든 .md 파일을 찾는 함수
async function getAllMarkdownFiles(dir: string, baseDir: string = dir): Promise<Array<{ filePath: string; relativePath: string }>> {
  const files: Array<{ filePath: string; relativePath: string }> = [];
  
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relativePath = path.relative(baseDir, fullPath);
      
      if (item.isDirectory()) {
        // 하위 디렉토리 재귀 탐색
        const subFiles = await getAllMarkdownFiles(fullPath, baseDir);
        files.push(...subFiles);
      } else if (item.isFile() && item.name.endsWith('.md')) {
        // .md 파일 발견
        files.push({ filePath: fullPath, relativePath });
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return files;
}

export async function getBlogPosts(): Promise<PostData[]> {
  if (cachedBlogPosts) {
    return cachedBlogPosts;
  }

  try {
    const postsDirectory = path.join(process.cwd(), 'public/posts');
    const markdownFiles = await getAllMarkdownFiles(postsDirectory);

    const posts = await Promise.all(
      markdownFiles.map(async ({ filePath, relativePath }) => {
        // 파일 경로를 ID로 사용 (확장자 제거)
        const id = relativePath.replace(/\.md$/, '');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          id,
          title: data.title,
          date: data.date,
          description: data.description,
          tags: data.tags,
          content,
        };
      })
    );

    cachedBlogPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
    return cachedBlogPosts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getProjectPosts(): Promise<PostData[]> {
  if (cachedProjects) {
    return cachedProjects;
  }

  try {
    const projectsDirectory = path.join(process.cwd(), 'public/projects');
    const markdownFiles = await getAllMarkdownFiles(projectsDirectory);

    const projects = await Promise.all(
      markdownFiles.map(async ({ filePath, relativePath }) => {
        const fileName = path.basename(filePath);
        const { id, lang } = parseProjectFileName(fileName);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          id,
          lang,
          title: data.title || '',
          date: data.date || new Date().toISOString(),
          description: data.description || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          content,
        };
      })
    );

    cachedProjects = projects.sort((a, b) => (a.date > b.date ? -1 : 1));
    return cachedProjects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export async function getAvailableLanguages(baseId: string): Promise<string[]> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'public/projects');
    const markdownFiles = await getAllMarkdownFiles(projectsDirectory);
    
    return markdownFiles
      .map(({ filePath }) => {
        const fileName = path.basename(filePath);
        return parseProjectFileName(fileName);
      })
      .filter(info => info.baseId === baseId)
      .map(info => info.lang);
  } catch (error) {
    console.error('Error getting available languages:', error);
    return ['ko'];
  }
}

export async function getPostById(id: string, type: 'posts' | 'projects'): Promise<PostData | null> {
  try {
    const posts = type === 'posts' ? await getBlogPosts() : await getProjectPosts();
    
    // 정확한 ID 매칭 시도
    let post = posts.find(post => post.id === id);
    
    // 정확한 매칭이 없으면 파일명만으로 매칭 시도 (하위 폴더 고려)
    if (!post) {
      const fileName = path.basename(id);
      post = posts.find(post => {
        const postFileName = path.basename(post.id);
        return postFileName === fileName;
      });
    }
    
    return post || null;
  } catch (error) {
    console.error(`Error loading ${type} post:`, error);
    return null;
  }
} 