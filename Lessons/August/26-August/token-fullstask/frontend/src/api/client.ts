const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

interface RequestOptions {
    method?: string;
    body?: unknown;
    // служебный флаг, чтобы не уйти в бесконечную рекурсию при refresh
    _retry?: boolean;
}

let refreshPromise: Promise<boolean> | null = null;

// Если параллельно упало 3 запроса — рефрешимся один раз, остальные ждут этот же промис
function refreshTokens(): Promise<boolean> {
    if (!refreshPromise) {
        refreshPromise = fetch(`${API_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        })
            .then((r) => r.ok)
            .catch(() => false)
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
}

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, _retry = false } = options;

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        // ГЛАВНОЕ: без credentials: 'include' браузер не отправит и не примет куки
        // в cross-origin запросе, и вся httpOnly-схема просто не заработает
        credentials: 'include',
    });

    // access протух -> молча обновляем пару токенов и повторяем запрос один раз
    if (res.status === 401 && !_retry && !path.startsWith('/api/auth/')) {
        const ok = await refreshTokens();
        if (ok) {
            return api<T>(path, { ...options, _retry: true });
        }
    }

    if (res.status === 204) {
        return undefined as T;
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new ApiError(res.status, (data as { error?: string }).error ?? 'Request failed');
    }

    return data as T;
}
