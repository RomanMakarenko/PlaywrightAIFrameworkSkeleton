import { stat } from 'node:fs/promises';
import path from 'node:path';
import type { Page } from '@playwright/test';
import { DateTime } from 'luxon';

const DEFAULT_TIMEOUT_MS = 30_000;

export async function waitForElementToDisappear(
  page: Page,
  selector: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<void> {
  if (selector.trim().length === 0) {
    throw new TypeError('selector must not be empty.');
  }
  if (!Number.isFinite(timeoutMs) || timeoutMs < 0) {
    throw new RangeError('timeoutMs must be a finite number greater than or equal to 0.');
  }

  try {
    await page.locator(selector).waitFor({ state: 'hidden', timeout: timeoutMs });
  } catch (cause) {
    const message = cause instanceof Error && cause.name === 'TimeoutError'
      ? `Timed out after ${timeoutMs}ms waiting for "${selector}" to disappear.`
      : `Failed while waiting for "${selector}" to disappear.`;
    throw new Error(message, { cause });
  }
}

export function parseCustomDate(dateString: string, format: string): Date {
  if (dateString.trim().length === 0) {
    throw new TypeError('dateString must not be empty.');
  }
  if (format.trim().length === 0) {
    throw new TypeError('format must not be empty.');
  }

  const parsedDate = DateTime.fromFormat(dateString, format, { zone: 'utc' });
  if (!parsedDate.isValid) {
    const reason = parsedDate.invalidExplanation
      ? ` ${parsedDate.invalidExplanation}`
      : '';
    throw new Error(`Invalid date "${dateString}" for format "${format}".${reason}`);
  }

  return parsedDate.toJSDate();
}

export async function uploadTestFile(
  page: Page,
  locator: string,
  relativePath: string,
): Promise<void> {
  if (locator.trim().length === 0) {
    throw new TypeError('locator must not be empty.');
  }
  if (relativePath.trim().length === 0) {
    throw new TypeError('relativePath must not be empty.');
  }

  const resolvedPath = path.resolve(process.cwd(), relativePath);
  let fileStats: Awaited<ReturnType<typeof stat>>;
  try {
    fileStats = await stat(resolvedPath);
  } catch (cause) {
    throw new Error(`Test file does not exist or cannot be accessed: "${resolvedPath}".`, {
      cause,
    });
  }

  if (!fileStats.isFile()) {
    throw new Error(`Expected a file for upload, but found a non-file path: "${resolvedPath}".`);
  }

  try {
    await page.locator(locator).setInputFiles(resolvedPath);
  } catch (cause) {
    throw new Error(`Failed to upload test file to locator "${locator}".`, { cause });
  }
}
