import { useEffect, useState } from "react";
import { Alternative } from "@prisma/client";
import { QuizWithQuestionsAndAlternatives } from "@/lib/prismaTypes";
import { useParams } from "next/navigation";

export function useQuizData() {
  const { id: quizId } = useParams(); // getting the id from the URL
  const [quiz, setQuiz] = useState<QuizWithQuestionsAndAlternatives | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quiz/${quizId}`);
        const data = await res.json();
        setQuiz(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const saveResults = async (pickedAnswers: Alternative[]) => {
    if (!quiz) return;
    const correctCount = pickedAnswers.reduce((count, answer) => {
      return answer?.is_correct ? count + 1 : count;
    }, 0);
    const score = {
      numberCorrectAnswers: correctCount,
    };
    try {
      const res = await fetch(`/api/quiz/${quiz.id}/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(score),
      });
      if (!res.ok) {
        throw new Error("Failed to save results");
      }
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  return {
    quiz,
    saveResults,
    isLoading,
  };
}
