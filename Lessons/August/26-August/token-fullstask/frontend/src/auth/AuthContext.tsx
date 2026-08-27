import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi, type User } from '../api/auth';

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // При старте приложения токена в JS нет (он в httpOnly куке),
    // поэтому «восстановление сессии» = запрос GET /api/auth/me
    useEffect(() => {
        authApi
            .me()
            .then(({ user }) => setUser(user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const { user } = await authApi.login(email, password);
        setUser(user);
    }, []);

    const register = useCallback(async (username: string, email: string, password: string) => {
        const { user } = await authApi.register(username, email, password);
        setUser(user);
    }, []);

    const logout = useCallback(async () => {
        await authApi.logout();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({ user, loading, login, register, logout }),
        [user, loading, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
