'use strict';

const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(
  process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, '..', '..'),
);
const protectedEnvPath = path.join(projectRoot, '.env');

function deny(reason) {
  process.stdout.write(
    `${JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason,
      },
    })}\n`,
  );
}

function resolvesToEnv(candidate) {
  if (typeof candidate !== 'string' || candidate.length === 0) {
    return false;
  }

  const resolved = path.resolve(projectRoot, candidate);
  if (resolved === protectedEnvPath) {
    return true;
  }

  try {
    return fs.realpathSync(resolved) === fs.realpathSync(protectedEnvPath);
  } catch {
    return false;
  }
}

function commandMentionsEnvRead(command) {
  if (typeof command !== 'string') {
    return false;
  }

  // Match a literal `.env` path, but not `.env.example` or `process.env`.
  return /(?:^|[\s"'`=:/])(?:\.\.?\/)*\.env(?=$|[\s"'`;&|/])/.test(command);
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    deny('Blocked because the tool request could not be inspected safely.');
    return;
  }

  const toolInput = payload.tool_input || {};
  const toolName = payload.tool_name;
  const envRead =
    (toolName === 'Read' && resolvesToEnv(toolInput.file_path)) ||
    (toolName === 'Grep' &&
      (resolvesToEnv(toolInput.path) ||
        resolvesToEnv(toolInput.file_path) ||
        commandMentionsEnvRead(toolInput.glob))) ||
    (toolName === 'Bash' && commandMentionsEnvRead(toolInput.command));

  if (envRead) {
    deny('Reading the project .env file is blocked to protect secrets.');
  }
});
