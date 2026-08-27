import { useEffect, useState, type FormEvent } from 'react';
import { postsApi, type Post } from '../api/posts';
import { useAuth } from '../auth/useAuth';

const emptyForm = { title: '', subtitle: '', body: '', subject: '' };

export function FeedPage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const load = () => {
        postsApi
            .list()
            .then(({ posts }) => setPosts(posts))
            .catch((e) => setError((e as Error).message))
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const onCreate = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            // куки едут автоматически (credentials: 'include'), заголовок Authorization не нужен
            const { post } = await postsApi.create(form);
            setPosts((prev) => [{ ...post, user: { username: user!.username } }, ...prev]);
            setForm(emptyForm);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const onDelete = async (id: number) => {
        try {
            await postsApi.remove(id);
            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <>
            <form className="card" onSubmit={onCreate}>
                <h2>Новый пост</h2>
                <label>
                    Заголовок
                    <input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        maxLength={50}
                        required
                    />
                </label>
                <label>
                    Подзаголовок
                    <input
                        value={form.subtitle}
                        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                        maxLength={50}
                        required
                    />
                </label>
                <label>
                    Тема
                    <input
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        maxLength={50}
                    />
                </label>
                <label>
                    Текст
                    <textarea
                        rows={4}
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        required
                    />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Опубликовать</button>
            </form>

            {loading && <p className="hint">Загрузка...</p>}

            <ul className="posts">
                {posts.map((post) => (
                    <li key={post.id} className="card">
                        <h3>{post.title}</h3>
                        <p className="subtitle">{post.subtitle}</p>
                        <p>{post.body}</p>
                        <footer>
                            <span>
                                {post.user?.username ?? 'аноним'}
                                {post.subject ? ` · ${post.subject}` : ''}
                            </span>
                            {post.userId === user?.id && (
                                <button type="button" className="link" onClick={() => onDelete(post.id)}>
                                    удалить
                                </button>
                            )}
                        </footer>
                    </li>
                ))}
            </ul>

            {!loading && posts.length === 0 && <p className="hint">Постов пока нет.</p>}
        </>
    );
}
