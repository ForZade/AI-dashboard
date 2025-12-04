import authRoutes from "../features/auth/routes";
import chatsRoutes from "../features/chats/chat.routes";
import projectsRoutes from "../features/projects/projects.routes";
import { FastifyInstance } from "fastify";

export function registerRoutes(fastify: FastifyInstance) {
    fastify.register(authRoutes, { prefix: "/auth" });
    fastify.register(projectsRoutes, { prefix: "/projects" });
    fastify.register(chatsRoutes, { prefix: "/chats" });
}
