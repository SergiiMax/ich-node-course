import type { Post } from "./types";

const BASE_URL = 'http://localhost:3000';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`)

  if(!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Failed to load posts')
  }
  return response.json()
}

export async function createPost(title: string, body: string): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  })
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to create post');
  }

  return response.json();
}