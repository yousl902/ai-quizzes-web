import { prisma } from "@/lib/prisma/client";
import { NextResponse } from "next/server";
import { AuthProvider } from "@/lib/auth/types";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { Quiz } from "@prisma/client";

export async function GET() {
    const authProvider: AuthProvider = getServerAuthProvider();
    const user = await authProvider.getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const quizzes: Quiz[] = await prisma.quiz.findMany({
        where: {
            user_quiz: {
                some: {
                    user_id: user.id,
                },
            },
        },
    });

    if (quizzes.length === 0) {
        return NextResponse.json({ error: "No quiz available" }, { status: 200 });
    }

    if (!quizzes) {
        return NextResponse.json({ error: "No quiz available" }, { status: 404 });
    }
    return NextResponse.json(quizzes, { status: 200 });
}