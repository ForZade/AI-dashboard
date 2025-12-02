import { prismaService } from "../db";

export class ChatService {
    async getAllChats(projectId: bigint) {
        const prisma = prismaService.getClient();

        const categories = await prisma.category.findMany({
            where: {
                project_id: projectId,
            },
            orderBy: { position: "asc" },
            include: {
                chats: {
                    orderBy: { created_at: "asc" }
                }
            }
        });

        const uncategorizedChats = await prisma.chat.findMany({
            where: {
                project_id: projectId,
                category_id: null,
            },
            orderBy: { created_at: "asc" },
        });

        return [
            categories.map(category => ({
                id: category.id,
                name: category.name,
                chats: category.chats
            })),
            {
                id: null,
                name: "Chats",
                chats: uncategorizedChats,
            }
        ];
    }
}

export const chatService = new ChatService();