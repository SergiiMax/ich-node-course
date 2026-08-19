import type { Post, PostId } from "../types";
import ListItem from "./ListItem";

interface IPostList {
  posts: Post[]
  onDelete: (id:PostId) => void
}

function PostList({posts, onDelete}: IPostList) {
  if(posts.length === 0) {
    return <p>No Posts yet</p>
  }
  return (
    <ul>
      {
        posts.map(post => (
            <ListItem post={post} onDelete={onDelete}/>
        ))
      }
    </ul>
  );
}

export default PostList;