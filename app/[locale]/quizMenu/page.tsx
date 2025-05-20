import QuizMenu from "@/components/QuizMenu";
import { prisma } from "@/lib/prisma/client";
import { Quiz } from "@prisma/client";
import { getTranslations } from "next-intl/server";

export default async function QuizMenuPage() {
  const t = await getTranslations("quizMenu");
  const quizzes: Quiz[] = await prisma.quiz.findMany();
  if (!quizzes) {
    return (
      <div className="min-h-screen bg-bg pt-16 pb-12 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <h1 className="text-3xl sm:text-4xl font-bold leading-relaxed mb-16 text-center text-quiz-menu-header">
            {t("title")}
          </h1>
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">
              {t("noQuizzes")}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-16 pb-12 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <h1 className="text-3xl sm:text-4xl font-bold leading-relaxed mb-16 text-center text-quiz-menu-header">
          {t("title")}
        </h1>
        <div>
          <QuizMenu quizzes={quizzes} />
        </div>
      </div>
    </div>
  );
}
