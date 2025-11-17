import { handleError } from "../lib/exceptions/error.handler";
import { FastifyInstance } from "fastify";

export function registerErrorHandling(fastify: FastifyInstance) {
    fastify.setErrorHandler((error, req, reply) => {
        handleError(reply, error);
    });
}
