export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ?? '3000',
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:8080',
  DATABASE_URL:
    process.env.DATABASE_URL ?? 'postgresql://user:password@localhost:5432/db',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_USER: process.env.EMAIL_USER,
  APP_NAME: process.env.APP_NAME ?? 'Boilerplate',
};
