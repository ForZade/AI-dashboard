import { createMessagesTable } from './messages.table';
import { createMemoryMessagesTable } from './memory.table';
import { scyllaClient } from './scylla.client';

export const initScyllaTables = async () => {
  try {
    await scyllaClient.connect();
    console.log('Connected to Scylla');

    await createMessagesTable();
    await createMemoryMessagesTable();

    console.log('All tables are ready');
  } catch (err) {
    console.error('Error initializing Scylla tables:', err);
  }
};
