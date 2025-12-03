import { scyllaService } from "../db";
import { generateId } from "../lib/utils/snowflake.utils";

export class MessageService {
    async sendMessage(message: string, userId: bigint, chatId: bigint) {
        const scylla = scyllaService.getClient();
        const messageId = generateId();

        await scylla.execute(
            `INSERT INTO messages (chat_id, message_id, sender_id, content, created_at) 
            VALUES (?, ?, ?, ?, ?)`,
            [chatId, messageId, userId, message, new Date()],
            { prepare: true }
        );
    }
}

export const messageService = new MessageService();