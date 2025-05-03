import { NextRequest, NextResponse } from "next/server";
import { AuthProvider } from "@/lib/auth/types";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { prisma } from "@/lib/prisma/client";

export async function GET(req: NextRequest) {
  const authProvider: AuthProvider = getServerAuthProvider();
  const user = await authProvider.getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const userId: string = user.id;
  let quizzesToFetch = 10;
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const quizzesParam = queryParams.get("numberOfQuizzes");
  if (quizzesParam) {
    quizzesToFetch = parseInt(quizzesParam, 10) || quizzesToFetch;
  }

  const scores = await prisma.userQuiz.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      id: "desc",
    },
    take: quizzesToFetch,
    select: {
      quiz_id: true,
      score: true,
    },
  });

  if (!scores) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  const quizIds = scores.map((score) => score.quiz_id);
  const quizzes = await prisma.quiz.findMany({
    where: {
      id: {
        in: quizIds,
      },
    },
    select: {
      id: true,
      title: true,
    },
  });

    if (!quizzes) {
        return NextResponse.json({ error: "Quizzes not found" }, { status: 404 });
    }

  // map quiz title to scores
  const scoresWithTitles = scores.map((score) => {
    const quiz = quizzes.find((quiz) => quiz.id === score.quiz_id);
    return {
      ...score,
      title: quiz ? quiz.title : "Unknown Quiz",
    };
  });

  return NextResponse.json(scoresWithTitles, { status: 200 });
}
