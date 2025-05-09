"use client";

import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Quiz } from "@prisma/client";
import { useTranslations } from "next-intl";

type GroupedQuizzes = Record<string, Quiz[]>;

export default function QuizMenu() {
  const t = useTranslations("quizMenu");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [groupedQuizzes, setGroupedQuizzes] = useState<GroupedQuizzes>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/quiz");
        const data: Quiz[] = await res.json();

        const grouped: GroupedQuizzes = {};
        data.forEach((quiz) => {
          if (!grouped[quiz.category]) {
            grouped[quiz.category] = [];
          }
          grouped[quiz.category].push(quiz);
        });

        setGroupedQuizzes(grouped);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchData();
  }, []);

  const nestedItems = activeItem ? groupedQuizzes[activeItem] : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-20 w-full px-4"
    >
      <AnimatePresence mode="wait">
        <motion.h2
          key={activeItem ?? "default"}
          initial={{ opacity: 0, y: -1 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-semibold text-center mb-4"
        >
          {activeItem
            ? t("selectQuizInCategory", { category: activeItem })
            : t("selectQuizCategory")}
        </motion.h2>
      </AnimatePresence>

      <motion.div
        layout
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col lg:flex-row lg:space-x-4"
      >
        {/* Main Accordion */}
        <motion.div
          layout
          className={`transition-all duration-500 mb-4 lg:mb-0 ${
            nestedItems ? "lg:w-1/2" : "w-full"
          } flex flex-col justify-start min-h-0`}
        >
          <Accordion
            type="single"
            collapsible
            onValueChange={(value: string | undefined) =>
              setActiveItem(value ?? null)
            }
          >
            {Object.keys(groupedQuizzes).map((category) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="py-2 min-h-[unset] text-left text-sm font-medium truncate">
                  {category}
                </AccordionTrigger>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Nested Accordion */}
        <AnimatePresence mode="wait">
          {nestedItems && (
            <motion.div
              layout
              key="nested"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="lg:w-1/2 lg:pl-2 flex flex-col justify-start min-h-0"
            >
              <Accordion type="single" collapsible>
                {nestedItems.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-yellow-100 rounded-lg transition"
                  >
                    <Link
                      href={`/quiz/${quiz.id}`}
                      className="py-2 px-1 text-left w-full block text-sm font-medium truncate"
                    >
                      {quiz.title}
                    </Link>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
