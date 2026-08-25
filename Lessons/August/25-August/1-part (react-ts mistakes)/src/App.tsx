import { useState } from 'react';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import type { Post } from './types';
import './App.css';

const initialPosts: Post[] = [
  { id: 1, title: 'Первый пост', body: 'Это демо React + TypeScript.' },
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  function addPost(title: string, body: string) {
    const newPost: Post = { id: Date.now(), title, body };
    posts.push(newPost);
    setPosts(posts);
  }

  function deletePost(id: number) {
    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
    <main className="app">
      <h1>Посты</h1>
      <PostForm onAdd={addPost} />
      <PostList posts={posts} onDelete={deletePost} />
    </main>
  );
}
