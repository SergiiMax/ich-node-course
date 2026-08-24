import { useState } from 'react';
import { PostForm } from './features/PostForm';
import { PostItem } from './features/PostItem';
import { List } from './ui/List';
import type { Category, Post } from './types';
import './App.css';

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Зачем типизировать пропсы',
    body: 'Чтобы невалидное состояние не компилировалось.',
    category: 'guide',
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  // Храним только id: сам пост всегда вычисляем из списка.
  const [editingId, setEditingId] = useState<number | null>(null);

  // find возвращает Post | undefined — TypeScript заставит это проверить.
  const editing = posts.find((post) => post.id === editingId);

  function createPost(title: string, body: string, category: Category) {
    const post: Post = {
      id: Date.now(),
      title,
      body,
      category,
      createdAt: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
  }

  function updatePost(id: number, title: string, body: string, category: Category) {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, title, body, category } : post)),
    );
    setEditingId(null);
  }

  function deletePost(id: number) {
    setPosts(posts.filter((post) => post.id !== id));
    // Удалили пост, который сейчас редактируется — выходим из режима правки.
    if (editingId === id) setEditingId(null);
  }


  return (
    <main className="app">
      <h1>Посты</h1>

      {editing ? (
        <PostForm
          // key заставляет React пересоздать форму при смене поста,
          // чтобы её внутреннее состояние стартовало с новых данных.
          key={editing.id}
          mode="edit"
          post={editing}
          onSubmit={(title, body, category) => updatePost(editing.id, title, body, category)}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <PostForm mode="create" onSubmit={createPost} />
      )}

      <List
        items={posts}
        getKey={(post) => post.id}
        empty={<p className="muted">Постов пока нет</p>}
        renderItem={(post) => (
          <PostItem post={post} onEdit={setEditingId} onDelete={deletePost} />
        )}
      />
    </main>
  );
}
