import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Here we define the routes that will be used in the pages and the components to send requests
// to use this in the components, we can use the route /api/exampleroute (path to this file)