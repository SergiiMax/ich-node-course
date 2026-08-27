import { useState, type FormEvent } from 'react';
import { useAuth } from '../auth/useAuth';

type Mode = 'login' | 'register';

export function AuthPage() {
    const { login, register } = useAuth();
    const [mode, setMode] = useState<Mode>('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setPending(true);
        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await register(username, email, password);
            }
            // токен никуда не сохраняем: сервер уже положил его в httpOnly куку
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="card auth-card">
            <div className="tabs">
                <button
                    type="button"
                    className={mode === 'login' ? 'tab active' : 'tab'}
                    onClick={() => { setMode('login'); setError(null); }}
                >
                    Вход
                </button>
                <button
                    type="button"
                    className={mode === 'register' ? 'tab active' : 'tab'}
                    onClick={() => { setMode('register'); setError(null); }}
                >
                    Регистрация
                </button>
            </div>

            <form onSubmit={onSubmit}>
                {mode === 'register' && (
                    <label>
                        Имя
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </label>
                )}

                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </label>

                <label>
                    Пароль
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                        minLength={6}
                        required
                    />
                </label>

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={pending}>
                    {pending ? '...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
                </button>
            </form>

            <p className="hint">
                Токен приходит в httpOnly куке — в localStorage ничего не пишем и из JS его не видно.
            </p>
        </div>
    );
}
