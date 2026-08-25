import { useState, type FormEvent } from 'react';

interface PostFormProps {
  // Функция-пропс: что принимает и что возвращает.
  onAdd: (title: string, body: string) => void;
}

export function PostForm({ onAdd }: PostFormProps) {
  // useState сам понимает, что это строки — тип писать не нужно.
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Тип события импортируем из react.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (title === '') return;

    onAdd(title, body);
    setTitle('');
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Заголовок"
      />
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Текст поста"
        rows={3}
      />
      <button type="submit">Добавить пост</button>
    </form>
  );
}
