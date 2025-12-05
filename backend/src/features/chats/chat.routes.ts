import { FastifyInstance } from "fastify";
import { authMiddleware, validateBody } from "../../middleware";
import { updateNameSchema, UpdateNameType } from "../chats/chat.validator";
import { chatController } from "./chat.controller";

export default function chatsRoutes(fastify: FastifyInstance) {
    fastify.patch<{ Body: UpdateNameType, Params: { id: string }}>(
        "/:id",
        { preValidation: [authMiddleware, validateBody(updateNameSchema)] },
        chatController.updateChatName,
    );

    fastify.delete<{ Params: { id: string } }>(
        "/:id",
        { preValidation: authMiddleware },
        chatController.deleteChat,
    );

    fastify.post<{ Params: { id: string }}>(
        "/:id/pin",
        { preValidation: authMiddleware },
        chatController.pinChat,
    );

    fastify.post<{ Body: { message: string }, Params: {id: string }}>(
        "/:id/messages",
        { preValidation: authMiddleware },
        chatController.sendChannelMessage,
    );

    fastify.get<{ Params: { id: string}, Querystring: { direction: string, fromMessageId: string, limit: string }}>(
        "/:id/messages",
        { preValidation: authMiddleware },
        chatController.getChannelMessages,
    );
}