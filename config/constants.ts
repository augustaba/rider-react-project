import path from 'path';

export const PROJECT_PATH = path.resolve(__dirname, '../');
export const PROJECT_NAME = path.parse(PROJECT_PATH).name;
export const SERVER_HOST = '127.0.0.1';
export const SERVER_PORT = 9000;
export const isDevelopment = process.env.NODE_ENV !== 'production';
