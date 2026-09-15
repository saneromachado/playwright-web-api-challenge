import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
  ],
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'web',
      testMatch: '**/web/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://demo.playwright.dev/todomvc/',
      },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'playwright-web-api-challenge',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    },
  ],
});
