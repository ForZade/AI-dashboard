import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../db/postgres/prisma";
import { redisService } from "../db";

export const IdempotencyMiddleware = async (req: FastifyRequest, res: FastifyReply) => {
    if (!["POST", "PATCH", "PUT"].includes(req.method)) {
        return;
    }

    let key = req.headers["idempotency-key"];

    if (!key) {
        return res.status(400).send({
            success: false,
            error: "Missing idempotency key",
        });
    }

    const user = req.user as User;
    const normalizedKey = `idempotency:${user.id}:${key}`;

    try {
        const redis = redisService.getClient();

        const result = await redis.set(
            normalizedKey,
            '1',
            "EX",
            10,
            "NX"
        );

        if (!result) {
            return res.status(400).send({
                success: false,
                error: "Duplicate request",
            });
        }
    } catch (err: unknown) {
        console.error(err);
    }
}