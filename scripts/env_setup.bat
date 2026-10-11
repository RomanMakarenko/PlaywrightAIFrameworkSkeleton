@echo off
setlocal

cd /d "%~dp0.."

if not exist package.json (
    echo Error: package.json was not found in the project root.
    exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
    echo Error: Node.js is required. Install Node.js before running this script.
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo Error: npm is required. Install npm before running this script.
    exit /b 1
)

echo Installing project dependencies...
call npm install dotenv @faker-js/faker luxon ajv csv-parse exceljs @axe-core/playwright allure-playwright mysql2
if errorlevel 1 exit /b %errorlevel%

call npm install --save-dev @types/node
if errorlevel 1 exit /b %errorlevel%

echo Installing Playwright browsers...
call npx playwright install
if errorlevel 1 exit /b %errorlevel%

echo Setup complete.
exit /b 0
