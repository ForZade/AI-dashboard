import dotenv from 'dotenv';
import { startTestContainers, stopTestContainers } from './db';
import { beforeAll, afterAll } from '@jest/globals';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  const { redisHost, redisPort, pgHost, pgPort, scyllaHost, scyllaPort } = await startTestContainers();
  
  process.env.REDIS_HOST = redisHost;
  process.env.REDIS_PORT = redisPort.toString();
  process.env.DB_HOST = pgHost;
  process.env.DB_PORT = pgPort.toString();
  process.env.SCYLLA_CONTACT_POINTS = scyllaHost;
  process.env.SCYLLA_PORT = scyllaPort.toString();
}, 60000);

afterAll(async () => {
  await stopTestContainers();
  process.exit(0);
}, 30000);