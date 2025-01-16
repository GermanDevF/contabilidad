/* eslint-disable no-console */
import express, { type Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middlewares/error-handler';
import healthRoutes from './api/health/health.routes';
import authRoutes from './api/auth/auth.routes';

// Inicializar variables de entorno
dotenv.config();

// Crear instancia de Prisma y Express
const prisma = new PrismaClient();
const app: Application = express();

// Middleware globales
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BASE_PATH = '/api';

// Rutas
app.use(BASE_PATH, healthRoutes);
app.use(`${BASE_PATH}/auth`, authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// Manejar cierre del servidor
process.on('SIGINT', () => {
  console.log('🛑 Cerrando conexiones...');
  prisma.$disconnect().finally(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('🛑 Cerrando conexiones...');
  prisma.$disconnect().finally(() => {
    process.exit(0);
  });
});
