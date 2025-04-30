import { NextResponse } from "next/server";
import { AuthProvider } from "@/lib/auth/types";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { prisma } from "@/lib/prisma/client";

export async function GET() {
  const authProvider: AuthProvider = getServerAuthProvider();
  const user = await authProvider.getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const userId: string = user.id;
  // get the number of how many quizzes we want to fetch from json
  

  const scores = await prisma.userQuiz.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      id: "desc",
    },
    take: 10,
    select: {
      score: true,
    },
  });

  if (!scores) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json(scores, { status: 200 });
}
