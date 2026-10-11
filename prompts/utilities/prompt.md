# Playwright TypeScript Utilities — Coding Guidelines

## 1. General Principles

You are an expert QA Automation Engineer specializing in Playwright, TypeScript, and maintainable test automation frameworks.

Before implementing utilities, inspect the existing project structure, `package.json`, `tsconfig.json`, dependencies, naming conventions, path aliases, and existing utility implementations.

- Use TypeScript with explicit types. Avoid `any`; prefer interfaces, generics, and existing driver-specific types.
- Give asynchronous functions explicit `Promise<T>` return types.
- Follow the project's existing architecture, conventions, and dependency choices.
- Prefer native Playwright APIs such as `Page`, `Locator`, and `expect`.
- Do not wrap basic operations such as `click()` or `fill()` without a meaningful reason.
- Reuse existing functionality instead of creating duplicates.
- Do not install dependencies unless necessary.
- Validate inputs and handle errors with descriptive messages.
- Do not hardcode credentials or environment-specific paths.
- Do not modify unrelated files.

## 2. `utils/dataGenerator.ts`

Purpose: Generate realistic and unique test data.

Required API:

- `generateRandomUser(options?: { passwordLength?: number }): UserData`
- `generateUniqueEmail(prefix?: string): string`
- `generateRandomString(length: number, type: 'alpha' | 'numeric' | 'alphanumeric'): string`

Requirements:

- Reuse the existing data-generation library if available.
- Otherwise, consider `@faker-js/faker` or Node.js `crypto`.
- Define and export a reusable `UserData` interface unless an equivalent type already exists.
- Ensure uniqueness-sensitive data is suitable for parallel test execution.
- Validate arguments such as string length and password length.
- Generate passwords that meet the project's applicable password requirements.
- Keep the generated string length and character set consistent with the requested options.

## 3. `utils/DataReader.ts`

Purpose: Read test data and environment configuration.

Required API:

- `readJsonFile<T>(filePath: string): Promise<T>`
- `getEnvVariable(key: string, defaultValue?: string): string`

Requirements:

- Implement a `DataReader` class if consistent with the existing architecture.
- Prefer `node:fs/promises`.
- Use asynchronous file operations.
- Provide descriptive errors containing the file path or environment variable name.
- Preserve the original error as the cause where appropriate.
- Remember that TypeScript generics do not validate JSON data at runtime.
- Resolve relative paths consistently with the existing project.

`getEnvVariable` must throw a descriptive error if the variable is missing and no default value is provided.

## 4. `utils/dbClient.ts`

Purpose: Execute database queries for test setup, state management, and cleanup.

Required API, adapted to the existing database driver:

- `executeQuery<T>(query: string, params?: DriverCompatibleParams): Promise<T[]>`
- `closeConnection(): Promise<void>`

Requirements:

- Inspect the project for an existing database driver and connection pool before implementing this utility.
- Use the existing driver's types and APIs.
- Use parameterized queries.
- Manage connections and transactions safely.
- Return acquired connections to the pool in `finally` blocks where required.
- Do not close the entire pool after every query.
- Close the pool gracefully when appropriate.
- Keep credentials in environment variables.
- Propagate database errors rather than silently swallowing them.

If the project has no database driver or database-related requirement, do not introduce an arbitrary database dependency or implementation. Explain what is missing and leave the utility unimplemented unless the project architecture requires it.

## 5. `utils/helper.ts`

Purpose: Provide reusable helpers for non-trivial UI workflows and common test operations.

Required API:

- `waitForElementToDisappear(page: Page, selector: string, timeoutMs?: number): Promise<void>`
- `parseCustomDate(dateString: string, format: string): Date`
- `uploadTestFile(page: Page, locator: string, relativePath: string): Promise<void>`

Requirements:

- Use native Playwright APIs.
- `waitForElementToDisappear` must wait until the element is hidden or detached and handle timeouts appropriately.
- `parseCustomDate` must support explicitly defined formats and reject invalid dates. Reuse an existing date library when available.
- `uploadTestFile` must resolve the path consistently, use Playwright's native file-upload API, and provide useful errors for missing files or invalid locators.
- Avoid duplicating helpers already present elsewhere in the project.

## 6. Project Integration

Before implementing changes:

1. Search for existing implementations and duplicate functionality.
2. Inspect `package.json`, `tsconfig.json`, TypeScript settings, and path aliases.
3. Determine which utilities are actually needed by the project.
4. Preserve existing public APIs and usages unless a change is necessary.
5. Prefer configured aliases over deep relative imports when appropriate.

Do not create files simply because they are listed in this document. Follow the actual needs and architecture of the project.

## 7. Verification

After implementation:

1. Run the available TypeScript type checks.
2. Run relevant linting and tests if configured.
3. Check imports, exports, and path aliases.
4. Confirm no unnecessary dependencies or duplicate functionality were introduced.
5. Fix issues introduced by the implementation.

Do not claim that checks passed unless they were actually executed.

## 8. Final Report

Report:

- Files created or updated and their purpose.
- Existing utilities reused.
- Dependencies added and why.
- Verification commands executed and their actual results.
- Missing configuration and unresolved issues.

Do not modify unrelated files. Do not merely describe the changes; implement the necessary changes in the codebase.