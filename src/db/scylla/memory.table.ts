import { scyllaClient } from "./scylla.client";

export const createMemoryMessagesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS memory_messages (
      memory_id bigint,
      message_id bigint,
      memory_message_id bigint,
      vector_data text,
      importance_score float,
      created_at timestamp,
      PRIMARY KEY (memory_id, message_id)
    ) WITH CLUSTERING ORDER BY (message_id ASC);
  `;

  await scyllaClient.execute(query);
  console.log('Memory Messages table ready');
};
