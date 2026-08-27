import type { Dialect } from 'sequelize';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_PORT: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_DIALECT: Dialect;
            PORT?: string;
            JWT_SECRET: string;
            JWT_EXPIRES_IN?: string;
        }
    }
}