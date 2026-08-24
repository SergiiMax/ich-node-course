import { Button } from '../ui/Button';
import { CATEGORY_LABELS, type Post } from '../types';

interface PostItemProps {
  post: Post;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function PostItem({ post, onEdit, onDelete }: PostItemProps) {
  return (
    <article className={`post post--${post.category}`}>
      <div className="post__main">
        <h3>{post.title}</h3>
        <span className="badge">{CATEGORY_LABELS[post.category]}</span>
        {post.body && <p>{post.body}</p>}
        <time>{new Date(post.createdAt).toLocaleString()}</time>
      </div>

      <div className="post__actions">
        <Button variant="secondary" size="sm" onClick={() => onEdit(post.id)}>
          Редактировать
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(post.id)}>
          Удалить
        </Button>
      </div>
    </article>
  );
}
