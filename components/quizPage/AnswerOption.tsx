interface AnswerOptionProps {
  answer: { option_text: string };
  isSelected: boolean;
  onClick: () => void;
}

export default function AnswerOption({
  answer,
  isSelected,
  onClick,
}: AnswerOptionProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer mt-2">
      <input
        type="radio"
        checked={isSelected}
        onChange={onClick}
        className="appearance-none w-5 h-5 rounded-full border-2 border-yellow-400 checked:bg-yellow-400 transition-colors"
      />
      <span>{answer.option_text}</span>
    </label>
  );
}
