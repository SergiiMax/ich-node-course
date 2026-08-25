import type { Post } from '../types';

// Интерфейс пропсов: что компонент принимает снаружи.
interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
}

export function PostItem({ post, onDelete }: PostItemProps) {
  return (
    <li className="card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => onDelete(post.id)}>Удалить</button>
    </li>
  );
}
