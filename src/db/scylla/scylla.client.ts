import { Client } from 'cassandra-driver';

export const scyllaClient = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'ai_dashboard',
});
