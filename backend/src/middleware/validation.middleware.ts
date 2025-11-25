import { FastifyReply, FastifyRequest } from "fastify"
import { ZodType } from "zod";

export const validateBody = <T>(schema: ZodType<T>) => {
    return async (req: FastifyRequest, res: FastifyReply) => {
        const result = await schema.safeParseAsync(req.body);

        if (!result.success) {
            const details = result.error.issues.map(issue => ({
                path: issue.path.join("."),
                message: issue.message,
            }));

            return res.status(400).send({
                success: false,
                status: 400,
                error: "Validation Failed",
                details,
            });
        }

        req.body = result.data;
    }
}