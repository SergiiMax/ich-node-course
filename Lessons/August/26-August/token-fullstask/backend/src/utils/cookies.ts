import type { CookieOptions, Response } from 'express';

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';

const isProd = process.env.NODE_ENV === 'production';

// В проде фронт и бэк обычно на одном сайте -> sameSite: 'lax' + secure.
// В деве localhost:5173 -> localhost:3333 это тот же site, поэтому 'lax' тоже работает.
// Если фронт на другом домене (cross-site), нужен sameSite: 'none' + secure: true (только HTTPS).
const base: CookieOptions = {
    httpOnly: true,                       // JS из document.cookie не прочитает -> XSS не утащит токен
    secure: isProd,                       // только по HTTPS в проде
    sameSite: isProd ? 'strict' : 'lax',  // базовая защита от CSRF
};

const ACCESS_MAX_AGE = 15 * 60 * 1000;             // 15 минут
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000;   // 7 дней

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie(ACCESS_COOKIE, accessToken, {
        ...base,
        path: '/',
        maxAge: ACCESS_MAX_AGE,
    });

    // refresh отдаём браузеру только на эндпоинты авторизации:
    // он не поедет с каждым запросом к API
    res.cookie(REFRESH_COOKIE, refreshToken, {
        ...base,
        path: '/api/auth',
        maxAge: REFRESH_MAX_AGE,
    });
}

export function clearAuthCookies(res: Response) {
    // опции (кроме maxAge/expires) должны совпадать с теми, что были при установке,
    // иначе браузер не удалит куку
    res.clearCookie(ACCESS_COOKIE, { ...base, path: '/' });
    res.clearCookie(REFRESH_COOKIE, { ...base, path: '/api/auth' });
}
