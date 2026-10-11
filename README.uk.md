# Playwright + TypeScript Test Framework Skeleton

Стартовий каркас для UI, API, end-to-end та інших автоматизованих перевірок на **Playwright Test** і **TypeScript**. Репозиторій містить базову структуру, конфігурацію, приклад тесту й утиліти; він не містить окремого застосунку під тестом.

**Мова:** українська · [English](README.md)

## Передумови

- Node.js (рекомендовано актуальну LTS-версію) та npm.
- Доступ до інтернету для встановлення браузерів і запуску наявних прикладів, які відкривають `https://playwright.dev/`.

## Встановлення

У корені репозиторію виконай:

```bash
npm ci
npx playwright install
```

На Linux, якщо системні залежності браузерів ще не встановлені:

```bash
npx playwright install --with-deps
```

## Запуск тестів

```bash
# Усі тести в усіх налаштованих браузерах
npx playwright test

# Перелік знайдених тестів
npx playwright test --list

# Один браузерний проєкт
npx playwright test --project=chromium

# Інтерактивний режим Playwright
npx playwright test --ui
```

Поточний приклад у `tests/example.spec.ts` перевіряє сторінку документації Playwright на `playwright.dev`. Окремий локальний вебсервер для нього не потрібен. `baseURL` і `webServer` у `playwright.config.ts` поки не налаштовані.

Після запуску тестів HTML-звіт можна відкрити так:

```bash
npx playwright show-report
```

Playwright налаштований на Chromium, Firefox і WebKit. Звіт створюється HTML reporter-ом, а trace збирається під час першого повторного запуску тесту.

## Перевірка типів і lint

У проєкті увімкнено strict TypeScript і `noEmit`:

```bash
npx tsc --noEmit
```

Перевірити ESLint для вихідного коду, тестів і Playwright-конфігурації можна так:

```bash
npx eslint src tests playwright.config.ts
```

У `package.json` наразі не визначені npm scripts, тому запускай Playwright, TypeScript та ESLint безпосередньо через їхні CLI-команди.

## Налаштування середовища

`.env.example` містить приклад назв змінних і placeholder-значення. За потреби його можна скопіювати для локального налаштування:

```bash
cp .env.example .env
```

Заміни placeholder-и власними локальними значеннями, але не додавай `.env` до Git і не публікуй його вміст. `.gitignore` ігнорує локальні `.env`-файли, залишаючи `.env.example` доступним.

**Важливо:** dotenv-завантаження в `playwright.config.ts` наразі закоментоване. Тому саме копіювання `.env` не завантажить змінні автоматично в тестовий процес. Поточний приклад тесту не потребує значень із `.env`; для інших сценаріїв передавай потрібні змінні тестовому процесу або налаштуй CI secrets. Не виводь секрети в логи, звіти чи artifacts.

## Структура

```text
src/
  api/          # місце для повторно використовуваного API-коду
  components/   # повторно використовувані UI-компоненти
  config/       # конфігурація фреймворку
  data/         # спільні дані й моделі
  fixtures/     # типізовані Playwright fixtures за потреби
  models/       # спільні TypeScript-моделі
  pages/        # Page Objects
  utils/        # наявні утиліти

tests/
  api/          # API-тести
  db/           # тести бази даних
  e2e/          # end-to-end сценарії
  integration/  # інтеграційні тести
  testdata/     # статичні дані для тестів
  visual/       # візуальні перевірки
  example.spec.ts
```

Повторно використовуваний код розміщуй у `src/`, а специфічні для тестів сценарії й файли — у `tests/`. Частина каталогів є заготовками для розвитку інфраструктури; їхня наявність не означає, що відповідний тип інтеграції вже налаштований.

У `src/utils/` зараз є утиліти для генерації тестових даних, читання JSON та змінних середовища, MySQL-запитів, очікувань UI, дат і завантаження файлів. Підключення до БД потребує доступної тестової бази й коректних runtime-змінних; наявність клієнта сама по собі цього не забезпечує.

## CI

GitHub Actions workflow у `.github/workflows/playwright.yml` запускається на push і pull request до `main` або `master`. Він встановлює залежності та браузери, виконує `npx playwright test` і завантажує `playwright-report/` як artifact. У CI Playwright використовує два retries та одного worker-а.

## Додаткова документація

- [`CLAUDE.md`](CLAUDE.md) — домовленості для роботи з кодом і референсами.
- [`playwright-mcp-context.md`](playwright-mcp-context.md) — докладні правила браузерної роботи й тестування в цьому проєкті.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — дорожня карта; статус запланованих можливостей перевіряй за фактичною реалізацією.
