'use server';

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

export async function getBlogPosts(): Promise<PostData[]> {
  if (cachedBlogPosts) {
    return cachedBlogPosts;
  }

  try {
    const postsDirectory = path.join(process.cwd(), 'public/blog');
    const fileNames = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const id = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
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
    const fileNames = await fs.readdir(projectsDirectory);

    const projects = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const id = fileName.replace(/\.md$/, '');
          const fullPath = path.join(projectsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
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

    cachedProjects = projects.sort((a, b) => (a.date > b.date ? -1 : 1));
    return cachedProjects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export async function getPostById(id: string, type: 'blog' | 'projects'): Promise<PostData | null> {
  try {
    const posts = type === 'blog' ? await getBlogPosts() : await getProjectPosts();
    return posts.find(post => post.id === id) || null;
  } catch (error) {
    console.error(`Error loading ${type} post:`, error);
    return null;
  }
} 