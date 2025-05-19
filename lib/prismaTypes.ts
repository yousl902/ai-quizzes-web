import { Prisma } from "@prisma/client";

export type QuizWithQuestionsAndAlternatives = Prisma.QuizGetPayload<{
  include: {
    questions: {
      include: {
        alternatives: true;
      };
    };
  };
}>;

export type QuizWithQuestions = Prisma.QuizGetPayload<{
  include: {
    questions: true;
  };
}>;

export type QuesionWithAlternatives = Prisma.QuestionGetPayload<{
    include: {
        alternatives: true;
    };
}>;