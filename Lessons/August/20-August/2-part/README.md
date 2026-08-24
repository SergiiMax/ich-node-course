# React + TypeScript: продвинутый уровень

Приложение «Посты»: создание, редактирование и удаление. Ничего лишнего —
весь интерес в том, **как это типизировано**.

Проект — продолжение базового (тоже «Посты»). Там были интерфейс, пропсы и
`useState`. Здесь — приёмы, которые реально встречаются в рабочих проектах:
UI-компоненты поверх нативных элементов, дженерики и размеченные объединения.

## Запуск

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`build` запускает `tsc -b`, то есть это ещё и полная проверка типов.

## Структура

```
src/
  types.ts                 доменные типы: Post, Category
  ui/                      переиспользуемые компоненты, ничего не знают о постах
    Button.tsx             нативные пропсы + варианты оформления
    Input.tsx              нативные пропсы + label/error + useId
    Select.tsx             generic по строковому union
    List.tsx               generic по элементу списка
  features/                логика приложения
    PostForm.tsx           одна форма на два режима (create / edit)
    PostItem.tsx           карточка поста
  App.tsx
```

Архитектурное правило: папка `ui/` не импортирует ничего из `features/`.
UI-компоненты типизированы обобщённо и переносятся в другой проект как есть.

---

# Что здесь используется и зачем

## 1. `as const` + `(typeof X)[number]`

```ts
export const CATEGORIES = ['news', 'guide', 'note'] as const;
export type Category = (typeof CATEGORIES)[number]; // 'news' | 'guide' | 'note'
```

**Проблема, которую это решает.** Обычно нужны две вещи: тип (для проверок) и
массив (чтобы отрендерить `<option>`). Если писать их отдельно, они рано или
поздно разъедутся — добавили значение в тип, забыли в массив.

**Как работает.** `as const` превращает `string[]` в неизменяемый кортеж
`readonly ['news', 'guide', 'note']`, где каждый элемент — литеральный тип.
`(typeof CATEGORIES)[number]` берёт объединение всех его элементов. Источник
правды один — массив.

## 2. `Record<K, V>` для словарей

```ts
export const CATEGORY_LABELS: Record<Category, string> = {
  news: 'Новость',
  guide: 'Инструкция',
  note: 'Заметка',
};
```

Добавите в `Category` значение `'review'` — TypeScript тут же потребует
подпись и для него. Это «выключатель» целого класса багов вида «новая
категория отображается как пустая строка».

## 3. UI-компоненты поверх нативных элементов

### Button ([src/ui/Button.tsx](src/ui/Button.tsx))

```tsx
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
};

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return <button className={`btn btn--${variant} btn--${size} ${className ?? ''}`} {...rest} />;
}
```

Это **основной способ** типизировать компонент-обёртку, и весь смысл в одной
строке: `ComponentPropsWithoutRef<'button'>` даёт все пропсы настоящего
`<button>` — `onClick`, `disabled`, `type`, `form`, все `aria-*` и `data-*` — с
правильными типами. Руками их описывать не нужно, и они всегда соответствуют
текущей версии React.

Дальше пересечением (`&`) добавляются свои пропсы. `variant` и `size` — не
`string`, а литеральные объединения: опечатка `variant="primry"` не
скомпилируется, а редактор подскажет доступные варианты.

`className` вынут из `rest` и склеен с собственными классами — иначе внешний
класс затёр бы `btn btn--primary`, потому что в JSX побеждает последний
одноимённый проп.

| Тип | Когда использовать |
| --- | --- |
| `ComponentPropsWithoutRef<'button'>` | компонент не пробрасывает `ref` |
| `ComponentPropsWithRef<'button'>` | `ref` пробрасывается (в React 19 это обычный проп) |
| `ButtonHTMLAttributes<HTMLButtonElement>` | почти то же самое, вариант «по старинке» |

### Input ([src/ui/Input.tsx](src/ui/Input.tsx))

```tsx
type InputProps = ComponentPropsWithRef<'input'> & {
  label: string;
  error?: string;
};
```

Тот же приём: нативные пропсы плюс `label` (обязательный) и `error`
(необязательный). Компонент сам генерирует `id` через **`useId()`** и связывает
`<label htmlFor>` с `<input id>`, но разрешает передать свой `id` снаружи:

```tsx
const generatedId = useId();
const inputId = id ?? generatedId;
```

`error` управляет и текстом ошибки, и классом, и `aria-invalid` — одно поле,
консистентное поведение.

### Select ([src/ui/Select.tsx](src/ui/Select.tsx)) — дженерик с ограничением

```tsx
type SelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  getLabel: (option: T) => string;
  onChange: (value: T) => void;
};
```

`T extends string` — **ограничение дженерика** (generic constraint): T обязан
быть строковым, иначе его нельзя подставить в `value` у `<option>`.

Ключевая выгода — в месте использования:

```tsx
<Select
  value={draft.category}
  options={CATEGORIES}                    // отсюда выводится T = Category
  getLabel={(c) => CATEGORY_LABELS[c]}
  onChange={(category) => update('category', category)} // category: Category, не string
/>
```

Наружу приходит не `string`, а именно `Category`. Без дженерика в каждом месте
пришлось бы писать `event.target.value as Category` — то есть врать
компилятору руками.

### List ([src/ui/List.tsx](src/ui/List.tsx)) — дженерик-компонент

```tsx
export function List<T>({ items, getKey, renderItem }: ListProps<T>) { ... }
```

`T` выводится из `items`, поэтому в `renderItem(post) => ...` элемент уже имеет
тип `Post` — без указаний с нашей стороны. Компонент ничего не знает о постах
и переиспользуется с любыми данными.

`items: readonly T[]` — просим массив только на чтение: так в `List` можно
передать и обычный массив, и `as const`-кортеж, а компонент гарантированно его
не мутирует.

## 4. Discriminated union в пропсах: одна форма на два режима

Форма создания и форма редактирования отличаются набором пропсов, но не
разметкой. Вместо двух компонентов или пропсов «на всякий случай» —
размеченное объединение ([PostForm.tsx](src/features/PostForm.tsx)):

```tsx
// один именованный тип вместо копий одной и той же сигнатуры
type Submit = (title: string, body: string, category: Category) => void;

type PostFormProps =
  | { mode: 'create'; onSubmit: Submit }
  | { mode: 'edit'; post: Post; onSubmit: Submit; onCancel: () => void };
```

Что это даёт:

```tsx
<PostForm mode="create" onSubmit={create} />                       // ок
<PostForm mode="edit" post={post} onSubmit={save} onCancel={c} />  // ок
<PostForm mode="edit" onSubmit={save} />                           // ошибка: нет post и onCancel
<PostForm mode="create" post={post} onSubmit={create} />           // ошибка: post здесь лишний
```

Внутри компонента тип сужается по `props.mode`:

```tsx
const editing = props.mode === 'edit' ? props.post : null;

{props.mode === 'edit' && <Button onClick={props.onCancel}>Отмена</Button>}
```

`props.post` и `props.onCancel` **существуют только** внутри ветки `edit` —
проверки на `undefined` не нужны, их и не может быть.

Поля формы — обычные `useState`, по одному на поле:

```tsx
const [title, setTitle] = useState(editing?.title ?? '');
const [body, setBody] = useState(editing?.body ?? '');
const [category, setCategory] = useState<Category>(editing?.category ?? 'note');
```

Для строк тип не пишем — он выводится из `''`. А для категории пишем явно:
у `useState('note')` тип вывелся бы как `string`, и в `Select` его передать не
получилось бы. Это типичный случай, когда аннотация действительно нужна.

Форма редактирования стартует с **копии** значений поста, а сам пост в списке
не трогает. Поэтому работает «Отмена»: отменять нечего — исходные данные никто
не менял, а сохранение происходит только по кнопке.

Сравните с обычным подходом `{ post?: Post; onCancel?: () => void }`: там оба
поля везде необязательные, приходится писать `post?.title` и `onCancel?.()`, и
ничто не мешает вызвать форму в режиме редактирования вообще без поста.

Важная деталь: пропсы здесь **не деструктурируются** в сигнатуре
(`function PostForm(props: PostFormProps)`). Сужение union работает по
обращению `props.mode`; если разложить пропсы на переменные, связь между
`mode` и остальными полями теряется.

## 5. Состояние приложения

Всё состояние живёт в [App.tsx](src/App.tsx) — двумя обычными `useState`:

```tsx
const [posts, setPosts] = useState<Post[]>(initialPosts);
const [editingId, setEditingId] = useState<number | null>(null);
```

Два решения, которые здесь важнее любых типов:

**`editingId: number | null`, а не `editingPost: Post | null`.** Храним только
идентификатор, а сам пост вычисляем:

```tsx
const editing = posts.find((post) => post.id === editingId);
```

Хранили бы объект — получили бы две копии одного поста, которые
рассинхронизируются после сохранения. Производное значение всегда считается из
источника правды, а не дублируется в состоянии.

**`null` вместо флага `isEditing`.** Тип `number | null` описывает ровно два
осмысленных состояния. Пара `isEditing: boolean` + `editingId: number` допускала
бы бессмысленную комбинацию `isEditing: true, editingId: undefined`.

Обработчики — обычные функции, которые передаются вниз как пропсы:

```tsx
function deletePost(id: number) {
  setPosts(posts.filter((post) => post.id !== id));
  // Удалили пост, который сейчас редактируется — выходим из режима правки.
  if (editingId === id) setEditingId(null);
}
```

Компоненты о хранилище не знают: `PostItem` получает `onEdit`/`onDelete` и
просто сообщает, что нажал пользователь.

## 6. Мелочи, которые видно в App

```tsx
const editing = posts.find((post) => post.id === editingId);
```

`Array.prototype.find` возвращает `Post | undefined` — TypeScript не даст
обратиться к `editing.title` без проверки. Поэтому в разметке стоит
`editing ? ... : ...`, и в ветке `edit` пост гарантированно существует.

```tsx
<PostForm key={editing.id} mode="edit" post={editing} ... />
```

`key` — приём не про типы, а про React: при переключении на другой пост форма
пересоздаётся, и её внутреннее состояние стартует с новых данных.

## 7. Где мы намеренно остановились

TypeScript позволяет пойти сильно дальше, но на реальных проектах это чаще
мешает, чем помогает. Знать о таких приёмах полезно, применять — по ситуации:

- **Branded types** — `type PostId = number & { __brand: 'PostId' }`, чтобы
  нельзя было передать «просто число». Оправдано, когда сущностей много и их
  id реально путают. У нас обычный `number`.
- **Запрет пропсов через `Omit`** — например, `Omit<..., 'className'>`, чтобы
  снаружи нельзя было ломать стили компонента. Встречается в строгих
  дизайн-системах, в обычном проекте раздражает больше, чем защищает.
- **Взаимоисключающие пропсы** (`children?: never`) — заставить иконочную
  кнопку требовать `aria-label`. Приём хороший, но применять его стоит там, где
  правило действительно важно, а не ко всем компонентам подряд.
- **Одно состояние-объект вместо нескольких `useState`** — форма хранит
  `{ title, body, category }` одним куском и обновляет его обобщённой функцией
  `update<K extends keyof Draft>(key: K, value: Draft[K])`. Экономит код, когда
  полей много, но новичку проще читать отдельные `useState`.
- **`useReducer` с union действий** — состояние переносится в редьюсер, а
  действия описываются размеченным объединением
  (`{ type: 'post/deleted'; id: number } | ...`). Отличный приём, но нужен он
  тогда, когда действий много и несколько полей состояния меняются вместе.
  На трёх операциях это лишний слой, поэтому здесь два `useState`.
- **Схемы валидации** (`zod`, `valibot`) для данных с сервера. Вот это как раз
  берут почти всегда, но в приложении без бэкенда демонстрировать нечего.

Ориентир простой: тип должен снимать реальный класс ошибок. Если он существует
только чтобы выглядеть умно — это будущий источник раздражения для команды.

## 8. Настройки компилятора

В [tsconfig.app.json](tsconfig.app.json) включён **`strict: true`** — это
обязательно. Без него не проверяются `null`/`undefined`, и половина пользы
TypeScript пропадает. Плюс `noUnusedLocals` / `noUnusedParameters` из
шаблона Vite.

## 9. Чего избегать

| Вместо | Пишите |
| --- | --- |
| `any` | `unknown` + сужение |
| `value as Category` в каждом месте | дженерик, который выводит тип сам |
| `data!.field` | явная проверка или `?.` |
| `React.FC<Props>` | обычная функция `({...}: Props)` |
| `onChange: Function` | `(value: Category) => void` |
| `isEdit?: boolean` + опциональные пропсы | discriminated union по `mode` |
| `isEditing: boolean` + `editingId: number` | `editingId: number \| null` |
| ручное описание `onClick`, `disabled`… | `ComponentPropsWithoutRef<'button'>` |
