"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnswerOption from "@/components/AnswerOption";
import StatusBar from "@/components/ProgressBar";
import { Alternative } from "@prisma/client";
import { useQuizData } from "@/hooks/useQuizData";

export default function QuizCard() {
  const {
    currentQuestion,
    questionNumber,
    totalQuestionNumber,
    pickedAnswer,
    handleAnswerSelect,
    handleNext,
    quizCategory,
    isLoading,
  } = useQuizData();

  if (isLoading || !currentQuestion) {
    // loading state
    return (
      <Card className="w-full max-w-xl shadow-xl p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-10 bg-yellow-200 rounded w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">
          {quizCategory}
        </CardTitle>
        <CardDescription className="text-center">
          {/* TODO: this has to be changed based on config file and data frpm the database */}
          Pröva din förmåga att förstå ord och begrepp
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <StatusBar
          questionNumber={questionNumber}
          totalQuestions={totalQuestionNumber}
        />
        <label className="font-bold block">{currentQuestion?.question}</label>
        <div className="space-y-3">
          {currentQuestion?.alternatives?.map((alt: Alternative) => (
            <AnswerOption
              answer={alt}
              isSelected={pickedAnswer?.id === alt.id}
              onClick={() => handleAnswerSelect(alt)}
            />
          ))}
        </div>
        <Button
          disabled={!pickedAnswer}
          onClick={handleNext}
          className={`w-full py-1.5 font-bold transition ${
            pickedAnswer
              ? "bg-yellow-300 text-black hover:bg-amber-400"
              : "bg-yellow-200 text-black"
          }`}
        >
          Next Question
        </Button>
      </CardContent>
    </Card>
  );
}
