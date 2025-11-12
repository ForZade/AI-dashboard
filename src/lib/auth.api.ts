import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/auth.config";
import { NextResponse } from "next/server";

export async function requireAuth(): Promise<bigint> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    return BigInt(session.user.id);
}

export function unauthorizedResponse() {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}