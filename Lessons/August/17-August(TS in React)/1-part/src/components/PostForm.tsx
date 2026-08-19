import { useState, type FormEvent } from "react";

interface IPostForm {
  createPost: (title: string, description: string) => void
}
// const props = {
//     createPost: (title, description) => {}
// }
function PostForm({createPost}: IPostForm) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function handeSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(title === '') return
        createPost(title, description)
        setTitle('')
        setDescription('')
    }

  return (
    <form onSubmit={handeSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button>Add Post</button>
    </form>
  );
}

export default PostForm;