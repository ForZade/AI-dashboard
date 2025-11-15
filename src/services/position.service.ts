import { prisma } from "@/db/postgres/prisma.client";

export class PositionService {
    async generateNewRootPosition(userId: bigint): Promise<number> {
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
}