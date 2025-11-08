import { scyllaClient } from "./scylla.client";

export const createMessagesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS messages (
      thread_id bigint,
      message_id bigint,
      sender_id bigint,
      model_id bigint,
      content text,
      parent_message_id bigint,
      created_at timestamp,
      PRIMARY KEY (thread_id, message_id)
    ) WITH CLUSTERING ORDER BY (message_id ASC);
  `;

  await scyllaClient.execute(query);
  console.log('Messages table ready');
};
