"use client";
import QuizMenu from "@/components/QuizMenu";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function QuizMenuPage() {
  const t = useTranslations("quizMenu");
  return (
    <div className="min-h-screen bg-bg pt-16 pb-12 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold leading-relaxed mb-16 text-center text-quiz-menu-header"
        >
          {t("title")}
        </motion.h1>

        <div>
          <QuizMenu />
        </div>
      </div>
    </div>
  );
}
