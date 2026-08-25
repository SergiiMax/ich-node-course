import type { FC } from 'react';

// Описание поста: что компонент получает снаружи.
interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
}

export const PostItem: FC<PostItemProps> = ({ post, onDelete }) => {
  return (
    <li className="card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => onDelete(post.id)}>Удалить</button>
    </li>
  );
};
