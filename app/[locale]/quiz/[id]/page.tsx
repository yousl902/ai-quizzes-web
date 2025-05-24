import QuizCard from "@/components/quizPage/QuizCard";
import { prisma } from "@/lib/prisma/client";
import { QuizWithQuestionsAndAlternatives } from "@/lib/prismaTypes";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return await prisma.quiz.findMany({
    select: {
      id: true,
    },
  });
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: quizId } = await params;

  const quiz: QuizWithQuestionsAndAlternatives | null =
    await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            alternatives: true,
          },
        },
      },
    });

  if (!quiz) {
    notFound();
  }

  return (
    <div className="bg-bg min-h-screen flex flex-col items-center justify-center">
      <QuizCard quiz={quiz} />
    </div>
  );
}
