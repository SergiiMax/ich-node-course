import { PostItem } from './PostItem';
import type { Post } from '../types';

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

export function PostList({ posts, onDelete }: PostListProps) {
  if (posts.length === 0) {
    return <p>Постов пока нет</p>;
  }

  return (
    <ul className="list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={onDelete} />
      ))}
    </ul>
  );
}
