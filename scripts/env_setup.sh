#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd "$(dirname "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd "$SCRIPT_DIR/.." && pwd)
cd "$PROJECT_ROOT"

if [ ! -f package.json ]; then
  printf '%s\n' 'Error: package.json was not found in the project root.' >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' 'Error: Node.js is required. Install Node.js before running this script.' >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  printf '%s\n' 'Error: npm is required. Install npm before running this script.' >&2
  exit 1
fi

printf '%s\n' 'Installing project dependencies...'
npm install dotenv @faker-js/faker luxon ajv csv-parse exceljs @axe-core/playwright allure-playwright mysql2
npm install --save-dev @types/node

printf '%s\n' 'Installing Playwright browsers...'
npx playwright install

printf '%s\n' 'Setup complete.'
