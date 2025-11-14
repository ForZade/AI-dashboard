import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/auth.config";
import { UnauthorizedError } from "./errors/errors";

export async function requireAuth(): Promise<bigint> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new UnauthorizedError();
    }

    return BigInt(session.user.id);
}