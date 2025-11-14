import { Project } from "@/db/postgres/prisma";
import { prisma } from "@/db/postgres/prisma.client"
import { NotFoundError } from "@/lib/errors/errors";

export class ProjectServices {
    async getProjects(userId: string) {
        const projects = await prisma.project.findMany({
            where: {
                user_id: BigInt(userId),
            },
            orderBy: { position: "asc" },
        });

        if (!projects || projects.length === 0) {
            return new NotFoundError("No projects found");
        }

        return projects;
    }

    async createProject(data: Omit<Project, "id">) {
        const project = await prisma.project.create({
            data,
        });

        return project;
    }
}