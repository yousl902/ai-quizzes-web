import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { ProfileChart } from "@/components/navbar/ProfileChart";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma/client";

interface ProfileSectionProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
}

export async function ProfileSection({
  firstName,
  lastName,
  email,
  userId,
}: ProfileSectionProps) {
  const t = await getTranslations("navbar");
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  const scores: { quiz_id: string; score: number }[] =
    await prisma.userQuiz.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        id: "desc",
      },
      take: 10,
      select: {
        quiz_id: true,
        score: true,
      },
    });

  const quizIds = scores.map((score) => score.quiz_id);
  const quizzes: { id: string; title: string }[] = await prisma.quiz.findMany({
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

  // map quiz title to scores
  const quizResults: { title: string; quiz_id: string; score: number }[] =
    scores.map((score) => {
      const quiz: { id: string; title: string } | undefined = quizzes.find(
        (quiz) => quiz.id === score.quiz_id
      );
      return {
        ...score,
        title: quiz ? quiz.title : "Unknown Quiz",
      };
    });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">{fullName}</h4>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      {/* Diagram */}
      <div className="pt-2">
        <ProfileChart quizResults={quizResults} />
      </div>

      {/* Log-out */}
      <form>
        <div className="flex justify-center">
          <Button
            formAction={logout}
            className="mt-5 bg-btn-logout text-white hover:bg-btn-logout/90 hover:scale-105 transition-colors duration-200"
          >
            {t("logout")}
          </Button>
        </div>
      </form>
    </div>
  );
}
