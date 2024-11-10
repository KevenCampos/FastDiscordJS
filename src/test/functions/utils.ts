import dotenv from 'dotenv';
dotenv.config({path: `.env.${process.env.NODE_ENV || 'development'}`});

export function getEnv(key: string): string {
    const value = process.env[key];
    
    if (!value) {
        throw new Error(`${key} não foi definido no .env`);
    }

    return value;
}