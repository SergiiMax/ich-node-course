import type { Post } from "../types";
import Button from "./Button";


interface IPostItem {
    post: Post,
    onDelete: () => void
}

function PostItem({post, onDelete}: IPostItem) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <span>{post.category}</span>
      <p>{new Date(post.createdAt).toLocaleString()}</p>
      <Button>Delete</Button>
    </div>
  );
}

export default PostItem;
