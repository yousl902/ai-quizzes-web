import { prisma } from "@/lib/prisma/client";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { NextResponse, NextRequest } from "next/server";
import { AuthProvider } from "@/lib/auth/types";


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
    const userId: string = user.id;
    const quizId: string = routeParams.id;

    if (!quizId) {
        return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
    }

    const score: { score: number } | null = await prisma.userQuiz.findFirst({ 
        where: {
            user_id: userId,
            quiz_id: quizId,
        },

        select: {
            score: true,
        },
    });

    if (!score) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(score, { status: 200 });
}