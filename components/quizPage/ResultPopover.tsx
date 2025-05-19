// components/quizPage/ResultPopup.tsx
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export interface QuizResult {
  id: number;
  question: string;
  isCorrect: boolean;
}

interface ResultPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: QuizResult[];
  onClose: () => void;
  title?: string;
}

export default function ResultPopup({
  open,
  onOpenChange,
  results,
  onClose,
  title = "Quizresultat",
}: ResultPopupProps) {
  const correct = results.filter((r) => r.isCorrect);
  const incorrect = results.filter((r) => !r.isCorrect);
  const correctPercentage =
    Math.round((correct.length / results.length) * 100) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 bg-white shadow-2xl rounded-xl">
        <div className="bg-result-bg text-black p-5 rounded-t-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            <DialogDescription className="mt-2 flex justify-between">
              <span className="text-sm font-semibold">
                Resultat: {correctPercentage}%
              </span>
              <span className="text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {correct.length}/{results.length}
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {/* Rätt svar */}
          {correct.length > 0 && (
            <div className="mb-5">
              <h4 className="text-base font-semibold text-result-dark-correct mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Rätt svar
              </h4>
              <ul className="space-y-2">
                {correct.map((r) => (
                  <li
                    key={r.id}
                    className="bg-result-light-correct rounded-lg p-3 flex items-center gap-3 text-sm"
                  >
                    <CheckCircle className="h-5 w-5 text-result-dark-correct" />
                    <span className="text-gray-700">{r.question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fel svar */}
          {incorrect.length > 0 && (
            <div>
              <h4 className="text-base font-semibold text-result-dark-incorrect mb-2 flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                Fel svar
              </h4>
              <ul className="space-y-2">
                {incorrect.map((r) => (
                  <li
                    key={r.id}
                    className="bg-result-light-incorrect rounded-lg p-3 flex items-center gap-3 text-sm"
                  >
                    <XCircle className="h-5 w-5 text-result-dark-incorrect" />
                    <span className="text-gray-700">{r.question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t px-5 py-4">
          <Button
            onClick={onClose}
            className="w-full bg-result-bg hover:from-yellow-400 hover:to-yellow-500 text-black font-medium"
          >
            Stäng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}