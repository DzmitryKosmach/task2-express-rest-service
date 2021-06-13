import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const {PORT, PORT_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD,
  POSTGRES_DBNODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, } = process.env;
const {authMode} =  process.env;
export const AUTH_MODE = authMode === 'true';