FROM mcr.microsoft.com/playwright:v1.64.0-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY --chown=pwuser:pwuser src/ ./src/
COPY --chown=pwuser:pwuser tests/ ./tests/
COPY --chown=pwuser:pwuser playwright.config.ts tsconfig.json ./
RUN mkdir -p playwright/.auth && chown -R pwuser:pwuser playwright && chmod 1777 playwright/.auth

USER pwuser

CMD ["npm", "test"]
