1. в types.ts   id: string, а ожидается number

2. в PostForm.tsx

interface PostFormProps {
  // Функция-пропс: что принимает и что возвращает.
  onAdd: (title: string) => void;
}

onAdd: (title: string) имеет только один параметр, нужен ещё body

3. в PostForm.tsx

function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (title === '') return;

    onAdd(title, body);
    setTitle('');
  }

  event объявлен но не испольщуется для предотвращения рендера 
  event.preventDefault()

4. в консоли 
Each child in a list should have a unique "key" prop.
Check the render method of `PostList`. See https://react.dev/link/warning-keys for more information.

что нам намекает на то что нет ключа, идём смотрим и в PostList.tsx видим
return (
    <ul className="list">
      {posts.map((post) => (
        <PostItem post={post} onDelete={onDelete} />
      ))}
    </ul>
  );
  опаньки, а ключа то нет. Добавляем и чудо - ошибка ушла
  <PostItem key={post.id} post={post} onDelete={onDelete} />

5. 