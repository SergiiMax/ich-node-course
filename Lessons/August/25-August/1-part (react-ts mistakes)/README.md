# React + TypeScript: приложение «Посты»

Учебный проект: форма создания поста, список постов, удаление поста.
Всё, что нужно, чтобы понять базу TypeScript в React.

## Запуск

```bash
npm install
```

```bash
npm run dev
```

Проверить типы и собрать проект:

```bash
npm run build
```

## Структура

```
src/
  types.ts                 интерфейс Post
  App.tsx                  состояние: список постов
  components/
    PostForm.tsx           форма добавления
    PostList.tsx           список постов
    PostItem.tsx           одна карточка поста
```

Данные живут в `App`, компоненты получают их через пропсы и сообщают наверх
через функции-пропсы (`onAdd`, `onDelete`).

---

# Задание: найдите 10 багов

В этот проект намеренно внесены **10 ошибок**: пять ломают поведение
приложения, пять относятся к типизации. Задача — найти и исправить все.

## Порядок работы

**Шаг 1. Пользуйтесь приложением.**

```bash
npm run dev
```

Добавьте пост, удалите пост, отправьте форму. Откройте консоль браузера —
часть проблем React сообщает сам. Так находятся функциональные баги.

**Шаг 2. Запустите проверку типов.**

```bash
npm run build
```

Эта команда сначала запускает `tsc`. Прочитайте каждую ошибку и найдите
причину — обычно она в другом файле, а не там, где подчёркнуто.

**Шаг 3. Прочитайте код глазами.**

Не всё ловится компилятором. Пройдитесь по чеклисту:

- нигде нет `any`;
- нигде нет `React.FC`;
- колбэки типизированы полностью — `(id: number) => void`, а не `Function`;
- тип `Post` описан один раз в `types.ts` и импортируется;
- состояние не изменяется напрямую, а заменяется новым значением.

## Ориентиры

| Где искать | Сколько багов |
| --- | --- |
| `src/types.ts` | 1 |
| `src/App.tsx` | 2 |
| `src/components/PostForm.tsx` | 3 |
| `src/components/PostList.tsx` | 2 |
| `src/components/PostItem.tsx` | 2 |

Проект считается починенным, когда `npm run build` проходит без ошибок,
в консоли браузера нет предупреждений, а пост корректно добавляется,
отображается и удаляется.

---

# Основы TypeScript в React

## 1. Зачем нужен TypeScript

TypeScript — это JavaScript, в котором мы описываем **типы данных**. Ошибки
видно сразу в редакторе, ещё до запуска:

- забыли передать проп — подсветит;
- опечатались в имени поля (`post.titel`) — подсветит;
- передали число вместо строки — подсветит.

Бонусом работает автодополнение: редактор знает, какие поля есть у объекта.

Файлы с JSX имеют расширение `.tsx`, обычные — `.ts`.

## 2. Базовые типы

```ts
const title: string = 'Привет';
const count: number = 42;
const isDone: boolean = false;
const tags: string[] = ['react', 'ts'];
```

На самом деле почти всегда тип можно не писать — TypeScript выводит его сам:

```ts
const title = 'Привет'; // TypeScript и так знает, что это string
```

Тип пишут там, где вывести неоткуда: пропсы, состояние, аргументы функций.

## 3. Интерфейс — описание объекта

Интерфейс говорит, какие поля есть у объекта и какого они типа
([types.ts](src/types.ts)):

```ts
export interface Post {
  id: number;
  title: string;
  body: string;
}
```

Теперь такой объект создать нельзя — TypeScript скажет, что нет поля `body`:

```ts
const post: Post = { id: 1, title: 'Пост' }; // ошибка
```

Интерфейс лежит в отдельном файле, потому что его используют сразу несколько
компонентов. Импортируется он через `import type`:

```ts
import type { Post } from '../types';
```

## 4. Пропсы компонента

Пропсы — это объект, который компонент получает как аргумент. Значит, его тоже
описываем интерфейсом ([PostItem.tsx](src/components/PostItem.tsx)):

```tsx
interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
}

export function PostItem({ post, onDelete }: PostItemProps) {
  return (
    <li className="card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => onDelete(post.id)}>Удалить</button>
    </li>
  );
}
```

Разберём по частям:

- `post: Post` — обязательный проп-объект;
- `onDelete: (id: number) => void` — **функция**: принимает число, ничего не
  возвращает (`void`). Так типизируются все колбэки;
- `{ post, onDelete }: PostItemProps` — деструктуризация пропсов и указание их
  типа.

Теперь использовать компонент неправильно не получится:

```tsx
<PostItem post={post} />                    // ошибка: нет onDelete
<PostItem post={post} onDelete="удалить" /> // ошибка: это не функция
```

Массив в пропсах — просто `Post[]` ([PostList.tsx](src/components/PostList.tsx)):

```tsx
interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
}
```

Необязательный проп помечается знаком `?`:

```ts
interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
  showDate?: boolean; // можно не передавать
}
```

## 5. useState

Чаще всего тип писать не нужно — он выводится из начального значения
([PostForm.tsx](src/components/PostForm.tsx)):

```tsx
const [title, setTitle] = useState('');  // string
const [count, setCount] = useState(0);   // number
```

Тип указывают, когда из начального значения он непонятен — например, пустой
массив ([App.tsx](src/App.tsx)):

```tsx
const [posts, setPosts] = useState<Post[]>(initialPosts);
```

После этого `setPosts` примет только массив постов, а `posts.map()` будет знать,
что внутри лежат объекты с полями `id`, `title`, `body`.

## 6. События формы

Тип события импортируется из `react`:

```tsx
import { type FormEvent } from 'react';

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  onAdd(title, body);
}
```

Часто используемые типы событий:

| Событие                        | Тип                              |
| ------------------------------ | -------------------------------- |
| отправка формы                 | `FormEvent<HTMLFormElement>`     |
| ввод в input                   | `ChangeEvent<HTMLInputElement>`  |
| клик                           | `MouseEvent<HTMLButtonElement>`  |

Важно: если обработчик написан прямо в JSX, тип писать **не нужно** — React уже
знает, какое это событие:

```tsx
<input onChange={(event) => setTitle(event.target.value)} />
```

## 7. Чего избегать

- **`any`** — отключает все проверки, смысл TypeScript пропадает.
- **`React.FC`** — устаревший способ типизации компонента. Пишите обычную
  функцию с типом пропсов, как в примерах выше.
- **Дублировать типы** — если интерфейс `Post` нужен в трёх компонентах, он
  описывается один раз в `types.ts` и импортируется.
