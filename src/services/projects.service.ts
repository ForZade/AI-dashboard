import { Project } from "@/db/postgres/prisma";
import { prisma } from "@/db/postgres/prisma.client"
import { NotFoundError } from "@/lib/errors/errors";
import { generateId } from "@/lib/snowflake";
import { PositionService } from "./position.service";

const positionService = new PositionService();

export class ProjectsService {
    async getProjects(userId: bigint) {
        const projects = await prisma.project.findMany({
            where: {
                user_id: userId,
            },
            orderBy: { position: "asc" },
        });

        if (!projects || projects.length === 0) {
            throw new NotFoundError("No projects found");
        }

        return projects;
    }

    async createProject(data: Omit<Project, "id" | "created_at" | "folder_id" | "position">) {
        const snowflake = generateId();
        const position = await positionService.getNewRootPosition(data.user_id);

        const project = await prisma.project.create({
            data: {
                id: snowflake,
                position,
                ...data,
            }
        });

        return project;
    }

    async updateProject(projectId: bigint, userId: bigint, data: Partial<Project>) {
        const project = await prisma.project.findFirst({
            where: {
                id: BigInt(projectId),
                user_id: BigInt(userId)
            }
        });

        if (!project) throw new NotFoundError("Project either doesn't exist or you have no access");

        return await prisma.project.update({
            where: { id: BigInt(projectId) },
            data,
        });
    }

    async deleteProject(projectId: string, userId: string) {
        const project = await prisma.project.findFirst({
            where: {
                id: BigInt(projectId),
                user_id: BigInt(userId)
            }
        });

        if (!project) throw new NotFoundError("Project either doesn't exist or you have no access");

        return await prisma.project.delete({
            where: {
                id: BigInt(projectId),
            }
        });
    }
}