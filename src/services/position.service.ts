import { prisma } from "@/db/postgres/prisma.client";
import { NotFoundError } from "@/lib/errors/errors";

export class PositionService {
    async getNewRootPosition(userId: bigint): Promise<number> {
        const [maxProjectPos, maxFolderPos] = await Promise.all([
            prisma.project.findFirst({
              where: { user_id: userId, folder_id: null },
              orderBy: { position: 'desc' },
              select: { position: true },
            }),
            prisma.projectFolder.findFirst({
              where: { user_id: userId },
              orderBy: { position: 'desc' },
              select: { position: true },
            }),
          ]);
        
          const maxPos = Math.max(
            maxProjectPos?.position ?? -1,
            maxFolderPos?.position ?? -1
          );
        
          return maxPos + 1;
    }

    async moveItem(
        userId: bigint, 
        itemId: bigint, 
        newPosition: number, 
        itemType: "project" | "folder",
        fromFolderId?: bigint,
        toFolderId?: bigint,
    ) {
        if (fromFolderId !== toFolderId) {
            await this.reorderLocation(userId, fromFolderId);

            if (itemType === "project") {
                await prisma.project.update({
                    where: { id: itemId },
                    data: { folder_id: toFolderId ?? null }
                });
            }
        }

        const allItems = await this.getItemsInLocation(userId, toFolderId);

        const item = allItems.find(i => i.id === itemId);
        if (!item) throw new NotFoundError("Item not found");

        allItems.splice(allItems.indexOf(item), 1);
        allItems.splice(newPosition - 1, 0, item);

        await this.updatePosition(allItems);

        return allItems;
    }

    private async reorderLocation(userId: bigint, folderId?: bigint) {
        const items = await this.getItemsInLocation(userId, folderId);
        await this.updatePosition(items);
    }

    private async getItemsInLocation(userId: bigint, folderId?: bigint) {
        const [projects, folders] = await Promise.all([
            prisma.project.findMany({
                where: { user_id: userId, folder_id: folderId ?? null },
                orderBy: { position: "asc"},
                select: { id: true },
            }),
            !folderId ? prisma.projectFolder.findMany({
                where: { user_id: userId },
                orderBy: { position: "asc" },
                select: { id: true }
            }) : Promise.resolve([])
        ]);

        return [
            ...projects.map(project => ({ id: project.id, type: "project" as const })),
            ...folders.map(folder => ({ id: folder.id, type: "folder" as const})),
        ];
    }

    private async updatePosition(orderedItems: Array<{id: bigint, type: "project" | "folder" }>) {
        await Promise.all(
            orderedItems.map((item, index) => {
                if (item.type === "project") {
                    return prisma.project.update({
                        where: { id: item.id },
                        data: { position: index + 1 }
                    });
                }

                return prisma.projectFolder.update({
                    where: { id: item.id },
                    data: { position: index + 1 }
                });
            })
        )
    }
}