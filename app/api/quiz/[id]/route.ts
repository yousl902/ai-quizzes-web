import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { AuthProvider } from "@/lib/auth/types";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { Quiz } from "@prisma/client";

export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const authProvider: AuthProvider = getServerAuthProvider();
    const user = await authProvider.getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const routeParams: { id: string } = await params;
    const quizId: string = routeParams.id;

    const quiz: Quiz | null = await prisma.quiz.findUnique({
        where: { id: quizId },
    });

    if (!quiz) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
}