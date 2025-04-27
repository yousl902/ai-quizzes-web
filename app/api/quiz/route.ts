import { prisma } from "@/lib/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { AuthProvider } from "@/lib/auth/types";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { Quiz } from "@prisma/client";

export async function GET() {
    const authProvider: AuthProvider = getServerAuthProvider();
    const user = await authProvider.getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const quizzes: Quiz[] = await prisma.quiz.findMany();

    if (quizzes.length === 0) {
        return NextResponse.json({ error: "No quiz available" }, { status: 200 });
    }

    if (!quizzes) {
        return NextResponse.json({ error: "No quiz available" }, { status: 404 });
    }
    return NextResponse.json(quizzes, { status: 200 });
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.QUIZ_UPLOAD_SECRET;

    if (authHeader !== `Bearer ${secret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, category, questions } = body;

        const quiz = await prisma.quiz.create({
            data: {
                title,
                category,
                questions: {
                    create: questions.map((q: any) => ({
                        question: q.question,
                        image: q.image ?? null,
                        alternatives: {
                            create: q.alternatives.map((alt: any) => ({
                                option_text: alt.option_text,
                                is_correct: alt.is_correct,
                            })),
                        },
                    })),
                },
            },
            include: {
                questions: {
                    include: {
                        alternatives: true,
                    },
                },
            },
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
    }
}