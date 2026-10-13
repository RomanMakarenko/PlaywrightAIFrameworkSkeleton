# Playwright + TypeScript Test Framework Skeleton

Стартовий каркас для UI, API, end-to-end та інших автоматизованих перевірок на **Playwright Test** і **TypeScript**. Репозиторій містить базову структуру, конфігурацію, приклад тесту й утиліти; він не містить окремого застосунку під тестом.

**Мова:** українська · [English](README.md)

## Передумови

- Node.js (рекомендовано актуальну LTS-версію) та npm.
- Доступ до інтернету для встановлення браузерів і запуску read-only E2E та HTTP-перевірок Funtime.

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
npm test

# Перелік знайдених тестів
npm run test:list

# Швидка read-only HTTP-перевірка в Chromium
npm run test:smoke

# Один браузерний проєкт
npm test -- --project=chromium

# Інтерактивний режим Playwright
npx playwright test --ui
```

E2E-набір містить read-only сценарії публічного сайту Funtime та HTTP-перевірку доступності; локальний вебсервер не потрібен. `baseURL` Playwright за замовчуванням — `https://funtime.com.ua`; його можна перевизначити через `FUNTIME_BASE_URL`.

Після запуску тестів HTML-звіт можна відкрити так:

```bash
npx playwright show-report
```

Playwright налаштований на Chromium, Firefox і WebKit. Звіт створюється HTML reporter-ом, а trace збирається під час першого повторного запуску тесту.

## Опційно: Playwright CLI

У репозиторії також є додатковий skill `playwright-cli` для Claude Code: інструкції з автоматизації браузера містяться в `.claude/skills/playwright-cli/SKILL.md`, а тематичні довідники — поруч у `references/`. CLI — окремий інструмент від `@playwright/test`; він не потрібен для запуску тестів, перевірки типів чи CI.

Встанови CLI глобально та ініціалізуй підтримку браузера й skills командами:

```bash
npm install -g @playwright/cli@latest
playwright-cli install
playwright-cli install --skills
```

CLI зберігає дані браузерних сесій у `.playwright-cli/`, цей каталог ігнорується Git. Вважай snapshots, traces, скриншоти, відео й збережений стан браузера потенційно чутливими даними: перевіряй їх перед поширенням і не додавай credentials чи авторизований стан до репозиторію.

## Перевірка типів і lint

У проєкті увімкнено strict TypeScript і `noEmit`. Перевірити типи й виконати lint можна командами:

```bash
npm run typecheck
npm run lint
```

## Налаштування середовища

`.env.example` містить приклад назв змінних і placeholder-значення. За потреби його можна скопіювати для локального налаштування:

```bash
cp .env.example .env
```

Заміни placeholder-и власними локальними значеннями, але не додавай `.env` до Git і не публікуй його вміст. `.gitignore` ігнорує локальні `.env`-файли, залишаючи `.env.example` доступним.

**Важливо:** dotenv-завантаження вимкнене. Саме копіювання `.env` не завантажить змінні автоматично в тестовий процес; передавай їх через середовище процесу або CI. `FUNTIME_BASE_URL` необов'язкова й за замовчуванням дорівнює `https://funtime.com.ua`; задане значення має бути HTTP(S)-origin без шляху. Не виводь секрети в логи, звіти чи artifacts.

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
```

Повторно використовуваний код розміщуй у `src/`, а специфічні для тестів сценарії й файли — у `tests/`. Частина каталогів є заготовками для розвитку інфраструктури; їхня наявність не означає, що відповідний тип інтеграції вже налаштований.

У `src/utils/` зараз є утиліти для генерації тестових даних, читання JSON та змінних середовища, MySQL-запитів, очікувань UI, дат і завантаження файлів. Підключення до БД потребує доступної тестової бази й коректних runtime-змінних; наявність клієнта сама по собі цього не забезпечує.

## CI

GitHub Actions workflow у `.github/workflows/playwright.yml` запускається на push і pull request до `main` або `master`. Він встановлює залежності та браузери, виконує `npx playwright test` і завантажує `playwright-report/` як artifact. У CI Playwright використовує два retries та одного worker-а.

## Додаткова документація

- [`CLAUDE.md`](CLAUDE.md) — домовленості щодо коду, безпеки й ведення проєктних записів.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — дорожня карта та єдине джерело чеклістів фаз і статусу критеріїв приймання.
- [`docs/web/SITEMAP.md`](docs/web/SITEMAP.md) — карта виявлених публічних маршрутів `funtime.com.ua` з джерелами й обмеженнями покриття.
- [`docs/RUNBOOK.md`](docs/RUNBOOK.md) — хронологічні checkpoint-и: scope, причини, результати перевірок і handoff.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — довготривалі архітектурні й процесні рішення зі стабільними ID та обґрунтуванням.
- [`playwright-mcp-context.md`](playwright-mcp-context.md) — докладні правила браузерної роботи й тестування в цьому проєкті.

Документи мають різні ролі: план відстежує поточний статус фаз, runbook фіксує виконану роботу, а журнал рішень пояснює довготривалі вибори.
