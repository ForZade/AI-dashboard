import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/postgres/prisma.client";
import { requireAuth } from "@/lib/auth.api";
import { handleError } from "@/lib/errors/response.error";
import { safe } from "@/lib/result.util";
import { generateId } from "@/lib/snowflake";
import { createProjectSchema } from "@/features/projects/projects.validation";

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

export async function POST(req: NextRequest) {
    const [userId, authError] = await safe(requireAuth());
    if (authError) return handleError(authError);


    const [body, bodyError] = await safe(req.json());
    if (bodyError) return handleError(bodyError);

    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
        return handleError(validation.error);
    }

    const data = validation.data;
    const snowflake = generateId();

    const [project, projectError] = await safe(prisma.project.create({
        data: {
            id: snowflake,
            user_id: userId,
            position: 0, //! To be changed
            name: data.name,
            description: data.description ?? null,
            icon: data.icon ?? null,
            color: data.color ?? "gray",
        }
    }))

    if (projectError) return handleError(projectError);

    return NextResponse.json(project, { status: 201 });
}