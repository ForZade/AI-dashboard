import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/postgres/prisma.client";
import { safe } from "@/lib/result.util";
import { requireAuth } from "@/lib/auth.api";
import { handleError } from "@/lib/errors/response.error";
import { NotFoundError } from "@/lib/errors/errors";

export async function DELETE({ params }: {params: { id: string }}) {
    const [userId, authError] = await safe(requireAuth());
    if (authError) return handleError(authError);

    const projectId = BigInt(params.id);

    const [project, projectError] = await safe(prisma.project.findFirst({
        where: {
            id: projectId,
            user_id: userId,
        }
    }))

    const [, deleteError] = await safe(prisma.project.delete({
        where: {
            id: projectId,
        }
    }));
    if (projectError) return handleError(projectError);
    if (!project) return handleError(new NotFoundError('Project not found'));


    if (deleteError) return handleError(deleteError);

    return NextResponse.json({
        message: "Project successfully deleted."
    },
    { status: 200 });
}