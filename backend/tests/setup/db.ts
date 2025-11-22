import { GenericContainer } from "testcontainers";

let redisContainer: any;
let postgresContainer: any;
let scyllaContainer: any;

export async function startTestContainers() {
  redisContainer = await new GenericContainer("redis:latest")
    .withExposedPorts(6379)
    .start();

  postgresContainer = await new GenericContainer("postgres:latest")
    .withExposedPorts(5432)
    .withEnvironment({
      POSTGRES_PASSWORD: "test",
      POSTGRES_DB: "test",
    })
    .start();

  scyllaContainer = await new GenericContainer("scylladb/scylla:latest")
    .withExposedPorts(9042)
    .start();

  const redisHost = redisContainer.getHost();
  const redisPort = redisContainer.getMappedPort(6379);
  const pgHost = postgresContainer.getHost();
  const pgPort = postgresContainer.getMappedPort(5432);
  const scyllaHost = scyllaContainer.getHost();
  const scyllaPort = scyllaContainer.getMappedPort(9042);

  return { redisHost, redisPort, pgHost, pgPort, scyllaHost, scyllaPort };
}

export async function stopTestContainers() {
  if (redisContainer) await redisContainer.stop();
  if (postgresContainer) await postgresContainer.stop();
  if (scyllaContainer) await scyllaContainer.stop();
}