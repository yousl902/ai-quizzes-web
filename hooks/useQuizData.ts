import { useEffect, useState } from "react";
import { Alternative } from "@prisma/client";
import { QuizWithQuestionsAndAlternatives } from "@/lib/prismaTypes";
import { useRouter, useParams } from "next/navigation";

export function useQuizData() {
  const { id: quizId } = useParams(); // getting the id from the URL
  const [quiz, setQuiz] = useState<QuizWithQuestionsAndAlternatives | null>(null);
  const [pickedAnswers, setPickedAnswers] = useState<Alternative[]>([]);
  const [pickedAnswer, setPickedAnswer] = useState<Alternative | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const handleAnswerSelect = (answer: Alternative) => {
    const updatedAnswers = [...pickedAnswers];
    updatedAnswers[questionNumber] = answer;
    setPickedAnswers(updatedAnswers);
    setPickedAnswer(answer);
  };

  const saveResults = async () => {
    if (!quiz) return;
    const correctCount = pickedAnswers.reduce((count, answer) => {
      return answer?.is_correct ? count + 1 : count;
    }, 0);
    console.log("Correct answers:", correctCount);
    console.log("Picked answers:", pickedAnswers);
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

  const handleNext = () => {
    if (!pickedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }
  
    const nextQuestionNumber = questionNumber + 1;
  
    if (nextQuestionNumber >= totalQuestionNumber) {
      saveResults();
      router.push("/");
      return;
    }
  
    setQuestionNumber(nextQuestionNumber);
    setPickedAnswer(pickedAnswers[nextQuestionNumber] || null);
  };

  const handlePrev = () => {
    if (questionNumber > 0) {
      const prevQuestionNumber = questionNumber - 1;
      setQuestionNumber(prevQuestionNumber);
      setPickedAnswer(pickedAnswers[prevQuestionNumber] || null);
    }
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
    handlePrev,
    quizCategory,
    isLoading,
  };
}
