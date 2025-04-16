import { prisma } from '../prisma/client';
import { AuthUser } from './types';

// This function synchronizes the user data with the database.
// It creates a new user if it doesn't exist or updates the existing user.
// It uses the Prisma client to interact with the database.
export async function syncUser(authUser: AuthUser) {
  const user = await prisma.user.upsert({
    where: { email: authUser.email },
    update: {
      first_name: authUser.first_name || null,
      last_name: authUser.last_name || null,
      telephone: authUser.telephone || null,
    },
    create: {
      id: authUser.id,
      first_name: authUser.first_name || null,
      last_name: authUser.last_name || null,
      email: authUser.email,
      telephone: authUser.telephone || null,
      password: authUser.password || 'not_applicable',
    },
  });
  return user;
}