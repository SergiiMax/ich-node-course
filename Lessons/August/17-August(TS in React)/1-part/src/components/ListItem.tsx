import type { Post, PostId } from "../types";

interface IListItem {
  post: Post
  onDelete: (id: PostId) => void
}

function ListItem({post, onDelete}: IListItem) {
  const { id, title, description, category, createdAt } = post;
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{category}</span>
      <p>{createdAt}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default ListItem;
