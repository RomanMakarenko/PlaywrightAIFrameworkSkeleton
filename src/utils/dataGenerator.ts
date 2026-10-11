import { randomInt, randomUUID } from 'node:crypto';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type RandomStringType = 'alpha' | 'numeric' | 'alphanumeric';

const CHARACTERS: Record<RandomStringType, string> = {
  alpha: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  alphanumeric: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
};

const PASSWORD_CHARACTERS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  special: '!@#$%^&*()-_=+',
};

const FIRST_NAMES = ['Alex', 'Avery', 'Casey', 'Jordan', 'Morgan', 'Riley', 'Taylor'];
const LAST_NAMES = ['Anderson', 'Bennett', 'Carter', 'Hayes', 'Morgan', 'Parker', 'Reed'];

function pickCharacter(characters: string): string {
  return characters[randomInt(characters.length)]!;
}

function validateLength(
  length: number,
  name: string,
  minimum = 0,
  maximum = 4_096,
): void {
  if (!Number.isSafeInteger(length) || length < minimum || length > maximum) {
    throw new RangeError(
      `${name} must be a safe integer between ${minimum} and ${maximum}.`,
    );
  }
}

export function generateRandomString(length: number, type: RandomStringType): string {
  validateLength(length, 'length');

  const characters = CHARACTERS[type];
  if (!characters) {
    throw new TypeError(`Unsupported random string type: ${String(type)}.`);
  }

  return Array.from({ length }, () => pickCharacter(characters)).join('');
}

export function generateUniqueEmail(prefix = 'test'): string {
  const normalizedPrefix = prefix
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._+-]+/g, '.')
    .replace(/^[._+-]+|[._+-]+$/g, '')
    .slice(0, 32) || 'test';

  return `${normalizedPrefix}.${randomUUID()}@example.test`;
}

export function generateRandomUser(
  options: { passwordLength?: number } = {},
): UserData {
  const passwordLength = options.passwordLength ?? 16;
  validateLength(passwordLength, 'passwordLength', 8, 128);

  const passwordCharacters = [
    pickCharacter(PASSWORD_CHARACTERS.lowercase),
    pickCharacter(PASSWORD_CHARACTERS.uppercase),
    pickCharacter(PASSWORD_CHARACTERS.numeric),
    pickCharacter(PASSWORD_CHARACTERS.special),
  ];
  const allPasswordCharacters = Object.values(PASSWORD_CHARACTERS).join('');
  passwordCharacters.push(
    ...Array.from(
      { length: passwordLength - passwordCharacters.length },
      () => pickCharacter(allPasswordCharacters),
    ),
  );

  for (let index = passwordCharacters.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [passwordCharacters[index], passwordCharacters[swapIndex]] = [
      passwordCharacters[swapIndex]!,
      passwordCharacters[index]!,
    ];
  }

  const password = passwordCharacters.join('');
  const firstName = FIRST_NAMES[randomInt(FIRST_NAMES.length)]!;
  const lastName = LAST_NAMES[randomInt(LAST_NAMES.length)]!;

  return {
    firstName,
    lastName,
    email: generateUniqueEmail(`${firstName}.${lastName}`),
    password,
  };
}
