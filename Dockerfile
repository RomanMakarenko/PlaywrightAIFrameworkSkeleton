FROM mcr.microsoft.com/playwright:v1.64.0-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY --chown=pwuser:pwuser src/ ./src/
COPY --chown=pwuser:pwuser tests/ ./tests/
COPY --chown=pwuser:pwuser playwright.config.ts tsconfig.json ./

USER pwuser

CMD ["npm", "test"]
