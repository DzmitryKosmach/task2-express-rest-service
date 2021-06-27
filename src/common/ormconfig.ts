import { ConnectionOptions } from 'typeorm';
import {DB_HOST, DB_PORT, DB_USERNAME, DB_PASWORD, DB_NAME} from './config';

export const config = {
  type: 'postgres',  
  synchronize: true,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASWORD,
  database: DB_NAME,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  logging: true,
  entities: ['srs/entities/**/*.ts', 'build/entities/**/*.js'],
  migrations: ["src/migration/**/*{.ts,.js}", "build/migration/**/*.js"],
  subscribers: ['src/migration/**/*.ts'],
  cli: {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
} as ConnectionOptions;