import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `prisma` to persist across module reloads in development
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
const prisma = global.prisma || new PrismaClient();

// In development, store the client in globalThis to reuse it
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };