import { useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { CATEGORIES, CATEGORY_LABELS, type Category, type Post } from '../types';

/** Один именованный тип вместо трёх копий одной и той же сигнатуры. */
type Submit = (title: string, body: string, category: Category) => void;

/**
 * Discriminated union в пропсах: один компонент, два режима.
 * В режиме 'create' нет поста и нет отмены; в режиме 'edit' они обязательны.
 * Так набор пропсов невозможно собрать неправильно.
 */
type PostFormProps =
  | { mode: 'create'; onSubmit: Submit }
  | { mode: 'edit'; post: Post; onSubmit: Submit; onCancel: () => void };

export function PostForm(props: PostFormProps) {
  // props.mode === 'edit' сужает тип, и только тогда доступен props.post.
  const editing = props.mode === 'edit' ? props.post : null;

  // Для строк тип не пишем — он выводится. Для категории пишем: 'note'
  // сам по себе вывелся бы как string, а нам нужен Category.
  const [title, setTitle] = useState(editing?.title ?? '');
  const [body, setBody] = useState(editing?.body ?? '');
  const [category, setCategory] = useState<Category>(editing?.category ?? 'news');
  const [touched, setTouched] = useState(false);

  const error = touched && title.trim() === '' ? 'Введите заголовок' : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (title.trim() === '') return;

    props.onSubmit(title, body, category);

    if (props.mode === 'create') {
      setTitle('');
      setBody('');
      setCategory('note');
      setTouched(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        label="Заголовок"
        placeholder="О чём пост?"
        value={title}
        error={error}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={() => setTouched(true)}
      />

      <Input
        label="Текст"
        placeholder="Пара предложений"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />

      <Select
        label="Категория"
        value={category}
        options={CATEGORIES}
        getLabel={(item: Category) => CATEGORY_LABELS[item]}
        onChange={setCategory}
      />

      <div className="form__actions">
        <Button type="submit">{props.mode === 'create' ? 'Опубликовать' : 'Сохранить'}</Button>

        {/* onCancel существует только в режиме edit — TS это знает */}
        {props.mode === 'edit' && (
          <Button type="button" variant="secondary" onClick={props.onCancel}>
            Отмена
          </Button>
        )}
      </div>
    </form>
  );
}
