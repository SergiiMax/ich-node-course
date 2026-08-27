import { useAuth } from './auth/useAuth';
import { AuthPage } from './pages/AuthPage';
import { FeedPage } from './pages/FeedPage';

export default function App() {
    const { user, loading, logout } = useAuth();

    // пока идёт GET /me — не знаем, залогинены мы или нет
    if (loading) {
        return <div className="app"><p className="hint">Проверяем сессию...</p></div>;
    }

    return (
        <div className="app">
            <header className="topbar">
                <h1>Token demo</h1>
                {user && (
                    <div className="user">
                        <span>{user.username}</span>
                        <button type="button" onClick={logout}>Выйти</button>
                    </div>
                )}
            </header>

            <main>{user ? <FeedPage /> : <AuthPage />}</main>
        </div>
    );
}
