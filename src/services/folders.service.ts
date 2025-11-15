import { ProjectFolder } from "@/db/postgres/prisma";
import { prisma } from "@/db/postgres/prisma.client";
import { NotFoundError } from "@/lib/errors/errors";
import { generateId } from "@/lib/snowflake";

export class FoldersService {
    async getFolders(userId: bigint) {
        const folders = await prisma.projectFolder.findMany({
            where: {
                user_id: userId,
            }
        });

        if (!folders) throw new NotFoundError("No folders found");

        return folders;
    }

    async createFolder(data: ProjectFolder, projects: bigint[]) {
        const snowflake = generateId();

        const folder = await prisma.projectFolder.create({
            data: {
                ...data,
                id: snowflake
            }
        });

       await Promise.all(
            projects.map(async (projectId) => {
                const project = await prisma.project.findFirst({
                    where: { 
                        user_id: data.user_id, 
                        id: projectId 
                    },
                });

                if (!project) throw new NotFoundError("Project either doesn't exist or you have no access");

                prisma.project.update({
                    where: { id: projectId },
                    data: { folder_id: snowflake },
                });
            })
        );

        return folder;
    }

    async deleteFolder(folderId: bigint, userId: bigint) {
        const folderProjects = await prisma.project.findMany({
            where: {
                folder_id: folderId,
                user_id: userId,
            }
        });

        await Promise.all(
            folderProjects.map(project => {
                // Need to calculate position where to put Project:
                // - The idea is to put the project where folder position was.

                prisma.project.update({
                    where: {
                        id: project.id,
                    },
                    data: {
                        folder_id: null,
                    }
                });
            })
        );

        await prisma.projectFolder.delete({
            where: { id: folderId }
        });
    }
}