import { Project } from '../db/postgres/prisma';
import { prismaService } from '../db';
import { NotFoundError } from '../lib/exceptions';
import { generateId } from '../lib/utils/snowflake.utils';
import { PositionService } from './position.service';
import { CreateProjectType, UpdateProjectType } from '../features/projects/projects.validator';

const positionService = new PositionService();

export class ProjectsService {
    async getProjects(userId: bigint) {
        const prisma = prismaService.getClient();

        const projects = await prisma.project.findMany({
            where: {
                user_id: userId,
            },
            orderBy: { position: 'asc' },
        });

        if (!projects || projects.length === 0) {
            throw new NotFoundError('No projects found');
        }

        return projects;
    }

    async createProject(data: CreateProjectType & { user_id: bigint }) {
        const snowflake = generateId();
        const position = await positionService.getNewRootPosition(data.user_id);

        const prisma = prismaService.getClient();

        const project = await prisma.project.create({
            data: {
                id: snowflake,
                position,
                ...data,
            },
        });

        return project;
    }

    async updateProject(projectId: bigint, userId: bigint, data: UpdateProjectType) {
        const prisma = prismaService.getClient();

        const project = await prisma.project.findFirst({
            where: {
                id: BigInt(projectId),
                user_id: BigInt(userId),
            },
        });

        if (!project) throw new NotFoundError("Project either doesn't exist or you have no access");

        return await prisma.project.update({
            where: { id: BigInt(projectId) },
            data,
        });
    }

    async deleteProject(projectId: bigint, userId: bigint) {
        const prisma = prismaService.getClient();

        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                user_id: userId,
            },
        });

        if (!project) throw new NotFoundError("Project either doesn't exist or you have no access");

        return await prisma.project.delete({
            where: {
                id: projectId,
            },
        });
    }
}
