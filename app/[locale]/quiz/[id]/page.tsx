import QuizCard from "@/components/quizPage/QuizCard";
import { prisma } from "@/lib/prisma/client";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

export async function generateStaticParams() {
  return await prisma.quiz.findMany({
    select: {
      id: true,
    },
  });
}

const getQuiz = unstable_cache(
  async (quizId: string) => {
    return await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            alternatives: true,
          },
        },
      },
    });
  },
  ["quiz-data"],
  {
    revalidate: 3600, // for 1 hour
    tags: ["quiz"],
  }
);

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: quizId } = await params;

  const quiz = await getQuiz(quizId);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="bg-bg min-h-screen flex flex-col items-center justify-center">
      <QuizCard quiz={quiz} />
    </div>
  );
}
