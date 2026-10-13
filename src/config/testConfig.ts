const DEFAULT_FUNTIME_BASE_URL = 'https://funtime.com.ua';

function resolveFuntimeBaseURL(value: string | undefined): string {
  const configuredValue = value?.trim() || DEFAULT_FUNTIME_BASE_URL;

  try {
    const url = new URL(configuredValue);

    if (
      (url.protocol !== 'http:' && url.protocol !== 'https:') ||
      url.username !== '' ||
      url.password !== '' ||
      url.pathname !== '/' ||
      url.search !== '' ||
      url.hash !== ''
    ) {
      throw new Error();
    }

    return url.origin;
  } catch {
    throw new Error(
      'FUNTIME_BASE_URL must be a valid HTTP(S) origin without credentials, a path, query, or fragment.',
    );
  }
}

export const FUNTIME_BASE_URL = resolveFuntimeBaseURL(process.env.FUNTIME_BASE_URL);
