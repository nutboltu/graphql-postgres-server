import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || '8000';
export const NODE_ENV = process.env.NODE_ENV || 'local';

export const { DATABASE_HOST } = process.env;
export const { DATABASE_PORT } = process.env;
export const { DATABASE_USERNAME } = process.env;
export const { DATABASE_PASSWORD } = process.env;
export const { DATABASE_NAME } = process.env;

export const isLocalEnv = () => NODE_ENV === 'local';
export const isProduction = () => NODE_ENV === 'production';
