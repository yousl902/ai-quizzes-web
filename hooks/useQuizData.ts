import { useEffect, useState } from "react";
import { Quiz, Alternative } from "@prisma/client";
import { QuizWithQuestionsAndAlternatives } from "@/lib/prismaTypes";

export function useQuizData() {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const [quiz, setQuiz] = useState<QuizWithQuestionsAndAlternatives | null>(
    null
  );
  const [pickedAnswer, setPickedAnswer] = useState<Alternative | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/quiz");
        const data = await res.json();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // TODO: quizzes[1] is the quiz we want to fetch for testing only, change it later
    if (!quizzes || !quizzes[1]) return;
    const fetchQuiz = async () => {
      try {
        // TODO: dynamically get quizId from quizzes, this is only for testing
        const quizId = quizzes[1].id;
        const res = await fetch(`/api/quiz/${quizId}`);
        const data = await res.json();
        setQuiz(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [quizzes]);

  const handleAnswerSelect = (answer: Alternative) => {
    setPickedAnswer(answer);
  };

  const handleNext = () => {
    // TODO: save answer to database when user
    // clicks next before setting pickedAnswer to null
    setPickedAnswer(null);
    if (questionNumber >= totalQuestionNumber - 1) {
      setQuestionNumber(0);
      return;
    }
    // TODO: save answer to database when user clicks next and there is no more questions
    // next line is to be removed when saving to database
    setQuestionNumber((prev) => prev + 1);
  };

  const currentQuestion = quiz?.questions?.[questionNumber];
  const totalQuestionNumber = quiz?.questions?.length || 0;
  const quizCategory = quiz?.category || "";

  return {
    currentQuestion,
    questionNumber,
    totalQuestionNumber,
    pickedAnswer,
    handleAnswerSelect,
    handleNext,
    quizCategory: quizCategory,
    isLoading,
  };
}