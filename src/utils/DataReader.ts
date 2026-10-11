import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function readJsonFile<T>(filePath: string): Promise<T> {
  if (filePath.trim().length === 0) {
    throw new TypeError('filePath must not be empty.');
  }

  const resolvedPath = path.resolve(process.cwd(), filePath);
  let contents: string;

  try {
    contents = await readFile(resolvedPath, 'utf8');
  } catch (cause) {
    throw new Error(`Failed to read JSON file at "${resolvedPath}".`, { cause });
  }

  try {
    return JSON.parse(contents) as T;
  } catch (cause) {
    throw new Error(`Invalid JSON in file "${resolvedPath}".`, { cause });
  }
}

export function getEnvVariable(key: string, defaultValue?: string): string {
  const normalizedKey = key.trim();
  if (normalizedKey.length === 0) {
    throw new TypeError('Environment variable key must not be empty.');
  }

  const value = process.env[normalizedKey];
  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Required environment variable "${normalizedKey}" is not set.`);
}
