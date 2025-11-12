import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/postgres/prisma.client";
import { requireAuth } from "@/lib/auth.api";
import { handleError } from "@/lib/errors/response.error";
import { safe } from "@/lib/result.util";

export async function GET() {
    const userId = await requireAuth();

    const [projects, error] = await safe(prisma.project.findMany({
        where: {
            user_id: userId,
        }
    }));

    if (error) return handleError(error);

    return NextResponse.json(projects, { status: 200 });
}
