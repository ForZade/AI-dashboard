import { ProjectFolder } from "@/db/postgres/prisma";
import { prisma } from "@/db/postgres/prisma.client";
import { NotFoundError, ValidationError } from "@/lib/errors/errors";
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
        const project = await prisma.project.findMany({
            where: {
                folder_id: folderId,
                user_id: userId,
            }
        });

        if (project.length >= 1) throw new ValidationError("Folder can only be deleted if exactly 1 project remains");

        const folder = await prisma.projectFolder.findFirst({
            where: {
                id: folderId,
                user_id: userId,
            }
        });

        if (!folder) throw new NotFoundError("Folder does not exist");

        await prisma.project.update({
            where: {
                id: project[0].id,
            },
            data: {
                folder_id: null,
                position: folder.position
            }
        });

        await prisma.projectFolder.delete({
            where: { id: folderId }
        });
    }
}