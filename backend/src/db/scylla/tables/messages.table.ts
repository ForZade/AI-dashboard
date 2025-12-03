import { Client } from "cassandra-driver";
import chalk from "chalk";

export const createMessagesTable = async (scylla: Client | null) => {
    if (!scylla) throw new Error("Scylla client is null");

    const query = `
    CREATE TABLE IF NOT EXISTS messages (
        chat_id bigint,
        message_id bigint,
        sender_id bigint,
        model_id bigint,
        content text,
        created_at timestamp,
        PRIMARY KEY ((chat_id), message_id)
    ) WITH CLUSTERING ORDER BY (message_id DESC);
    `;

    await scylla.execute(query);
    console.log(`${chalk.blue("・")} Messages table ready`);
};
