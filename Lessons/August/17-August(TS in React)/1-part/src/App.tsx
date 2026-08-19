import { useState } from "react"
import type { Post, PostId } from "./types"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"

const initialPosts: Post[] = [
  {
    id: 1,
    title: "Last news",
    description: "Breaking news",
    category: "news",
    createdAt: new Date().toISOString()
  }
]



function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

function onDelete(id: PostId) {
  setPosts(posts.filter(post => post.id !== id))
}

function createPost(title: string, description: string) {
  const newPost: Post = {
    id: Date.now(),
    title,
    description,
    category: "news",
    createdAt: new Date().toISOString()
  }
  setPosts([newPost, ...posts])
}

  return (
    <>
      <PostForm createPost={createPost}/>
      <PostList posts={posts} onDelete={onDelete}/>
    </>
  )
}

export default App
