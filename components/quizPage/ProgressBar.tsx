import { Progress } from "@/components/ui/progress";

interface StatusBarProps {
  questionNumber: number;
  totalQuestions: number;
}

export default function StatusBar({
  questionNumber,
  totalQuestions,
}: StatusBarProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <Progress
      value={progress}
      className="h-3 bg-gray-200 [&>div]:bg-yellow-400"
    />
  );
}
