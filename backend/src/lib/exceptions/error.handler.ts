import { AppError } from "./errors";
import { ZodError } from "zod";
import { ValidationError } from "./errors";
import { FastifyReply } from "fastify";

export function handleError(res: FastifyReply, error: unknown) {
    console.error('API Error:', error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).send({
            error: error.message,
            code: error.code,
            ...(error instanceof ValidationError && error.details
            ? { details: error.details }
            : {}),
        });
    }

    if (error instanceof ZodError) {
        return res.status(400).send({
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: error.issues,
        });
    }

    return res.status(500).send({
        error: 'Internal server error', code: 'INTERNAL_ERROR'
    });
}