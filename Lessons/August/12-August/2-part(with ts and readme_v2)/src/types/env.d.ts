import type { Dialect } from "sequelize";

declare global {
  namespace NodeJS {
    // способ сгруппировать типы под общим именем, чтобы они не пересекались и не конфликтовали
    // [key:string] : string | undefind - это то как объявлен процесс env в самом модуле @types/node
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
