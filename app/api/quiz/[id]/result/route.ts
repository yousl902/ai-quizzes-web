import { prisma } from "@/lib/prisma/client";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { NextResponse, NextRequest } from "next/server";
import { AuthProvider } from "@/lib/auth/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authProvider: AuthProvider = getServerAuthProvider();
  const user = await authProvider.getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const routeParams: { id: string } = await params;
  const userId: string = user.id;
  const quizId: string = routeParams.id;

  if (!quizId) {
    return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
  }

  const score: { score: number } | null = await prisma.userQuiz.findFirst({
    where: {
      user_id: userId,
      quiz_id: quizId,
    },

    select: {
      score: true,
    },
  });

  if (!score) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json(score, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authProvider: AuthProvider = getServerAuthProvider();
  const user = await authProvider.getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const routeParams: { id: string } = await params;
  const userId: string = user.id;
  const quizId: string = routeParams.id;

  if (!quizId) {
    return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
  }

  const data = await req.json();
  const score = data.numberCorrectAnswers;
  if (typeof score !== "number") {
    return NextResponse.json(
      { error: "Score must be a number" },
      { status: 400 }
    );
  }

  const existingRecord = await prisma.userQuiz.findUnique({
    where: {
      user_id_quiz_id: {
        user_id: userId,
        quiz_id: quizId,
      },
    },
  });

  try {
    if (!existingRecord) {
      // No record exists, create a new one
      await prisma.userQuiz.create({
        data: {
          user_id: userId,
          quiz_id: quizId,
          score,
        },
      });
    } else if (score > existingRecord.score) {
      // Only update if new score is higher
      await prisma.userQuiz.update({
        where: {
          user_id_quiz_id: {
            user_id: userId,
            quiz_id: quizId,
          },
        },
        data: {
          score,
        },
      });
    }

    return NextResponse.json(
      { message: "Score saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    // use the error object to get more information about the error
    console.error("Error saving score:", error);
    return NextResponse.json(
      { error: "Failed to save score" },
      { status: 500 }
    );
  }
}
