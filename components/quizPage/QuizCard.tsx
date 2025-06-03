"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnswerOption from "@/components/quizPage/AnswerOption";
import StatusBar from "@/components/quizPage/ProgressBar";
import { Alternative } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ResultPopup, { QuizResult } from "@/components/quizPage/ResultPopover";
import { CheckCircle } from "lucide-react";
import {
  QuesionWithAlternatives,
  QuizWithQuestionsAndAlternatives,
} from "@/lib/prismaTypes";
import { useRouter } from "@/i18n/navigation";

type QuizInProgressCardProps = {
  quizTitle: string;
  questionNumber: number;
  totalQuestionNumber: number;
  currentQuestion: QuesionWithAlternatives;
  pickedAnswer: Alternative | null;
  handleAnswerSelect: (answer: Alternative) => void;
  handleNext: () => void;
  handlePrev: () => void;
};

export default function QuizCard({
  quiz,
}: {
  quiz: QuizWithQuestionsAndAlternatives | null;
}) {
  const [pickedAnswers, setPickedAnswers] = useState<Alternative[]>([]);
  const [pickedAnswer, setPickedAnswer] = useState<Alternative | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const currentQuestion = quiz?.questions?.[questionNumber];
  const totalQuestionNumber = quiz?.questions?.length || 0;
  const quizTitle = quiz?.title || "";
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [quizDone, setQuizDone] = useState<boolean>(false);

  const handleAnswerSelect = (answer: Alternative) => {
    const updatedAnswers = [...pickedAnswers];
    updatedAnswers[questionNumber] = answer;
    setPickedAnswers(updatedAnswers);
    setPickedAnswer(answer);
  };

  const handleNext = () => {
    if (!pickedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }

    const nextQuestionNumber = questionNumber + 1;

    if (nextQuestionNumber >= totalQuestionNumber) {
      saveResults();

      const all: QuizResult[] = quiz!.questions.map((q, idx) => {
        const picked = pickedAnswers[idx];
        const correctAlt = q.alternatives.find((a) => a.is_correct);
        return {
          id: idx,
          question: q.question,
          isCorrect: picked?.id === correctAlt?.id,
        };
      });

      setQuizDone(true);
      setResults(all);
      setShowResults(true);
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

  const saveResults = async () => {
    if (!quiz) return;
    const correctCount = pickedAnswers.reduce((count, answer) => {
      return answer?.is_correct ? count + 1 : count;
    }, 0);
    const score = {
      numberCorrectAnswers: correctCount,
    };
    try {
      const res = await fetch(`/api/quiz/${quiz!.id}/result`, {
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

  if (!quizDone) {
    return (
      <QuizInProgressCard
        quizTitle={quizTitle}
        questionNumber={questionNumber}
        totalQuestionNumber={totalQuestionNumber}
        currentQuestion={currentQuestion as QuesionWithAlternatives}
        pickedAnswer={pickedAnswer}
        handleAnswerSelect={handleAnswerSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );
  }

  return (
    <>
      <QuizCompletedCard quizTitle={quizTitle} />
      <ResultPopup
        open={showResults}
        onOpenChange={setShowResults}
        results={results}
        onClose={() => setShowResults(false)}
      />
    </>
  );
}

const QuizInProgressCard: React.FC<QuizInProgressCardProps> = ({
  quizTitle,
  questionNumber,
  totalQuestionNumber,
  currentQuestion,
  pickedAnswer,
  handleAnswerSelect,
  handleNext,
  handlePrev,
}) => {
  const t = useTranslations("buttons");
  return (
    <Card className="w-full max-w-xl shadow-xl rounded-none sm:rounded-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">
          {quizTitle}
        </CardTitle>
        <CardDescription className="text-center">
          {/* TODO: this has to be changed based on config file and data frpm the database */}
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
              key={alt.id}
              answer={alt}
              isSelected={pickedAnswer?.id === alt.id}
              onClick={() => handleAnswerSelect(alt)}
            />
          ))}
        </div>
        <div className="flex justify-between py-1.5">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={questionNumber === 0}
            className="w-1/2 mr-0.5 bg-btn-prev text-black hover:bg-btn-prev-hover"
          >
            {t("prev")}
          </Button>
          <Button
            disabled={!pickedAnswer}
            onClick={handleNext}
            className={`w-1/2 ml-0.5 font-bold transition ${
              pickedAnswer
                ? "bg-btn-next text-black hover:bg-btn-next-hover"
                : "bg-btn-next text-black hover:bg-btn-next-hover"
            }`}
          >
            {questionNumber === totalQuestionNumber - 1
              ? t("finish")
              : t("next")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const QuizCompletedCard = ({ quizTitle }: { quizTitle: string }) => {
  const t = useTranslations("buttons");
  const router = useRouter();
  const goToQuizMenu = () => {
    router.push("/quizMenu");
  };

  return (
    <Card className="w-full max-w-xl shadow-xl rounded-none sm:rounded-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">
          {quizTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <Button
            variant="outline"
            onClick={goToQuizMenu}
            className="w-1/2 mx-auto bg-btn-prev text-black hover:bg-btn-prev-hover"
          >
            {t("goToQuizMenu")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
