import { Buffer } from 'node:buffer';
import { createPool, type Pool, type RowDataPacket } from 'mysql2/promise';
import { getEnvVariable } from './DataReader';

export type QueryParameter = string | number | boolean | Date | Buffer | null;
export type QueryParams = readonly QueryParameter[];

let connectionPool: Pool | undefined;

function createConnectionPool(): Pool {
  const port = Number(getEnvVariable('DB_PORT', '3306'));
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new RangeError('DB_PORT must be an integer between 1 and 65535.');
  }

  return createPool({
    host: getEnvVariable('DB_HOST'),
    user: getEnvVariable('DB_USER'),
    password: getEnvVariable('DB_PASSWORD'),
    database: getEnvVariable('DB_NAME'),
    port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

function getConnectionPool(): Pool {
  connectionPool ??= createConnectionPool();
  return connectionPool;
}

export async function executeQuery<T = RowDataPacket>(
  query: string,
  params: QueryParams = [],
): Promise<T[]> {
  if (query.trim().length === 0) {
    throw new TypeError('query must not be empty.');
  }

  try {
    const [result] = await getConnectionPool().execute(query, [...params]);
    return (Array.isArray(result) ? result : [result]) as T[];
  } catch (cause) {
    throw new Error('Failed to execute the database query.', { cause });
  }
}

export async function closeConnection(): Promise<void> {
  if (!connectionPool) {
    return;
  }

  const poolToClose = connectionPool;
  await poolToClose.end();
  if (connectionPool === poolToClose) {
    connectionPool = undefined;
  }
}
