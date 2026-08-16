import { defineConfig } from '@playwright/test';

const viewports = [
  ['mobile-sm', { width: 375, height: 667 }],
  ['mobile-lg', { width: 390, height: 844 }],
  ['tablet', { width: 768, height: 1024 }],
  ['desktop-sm', { width: 1024, height: 768 }],
  ['desktop-lg', { width: 1440, height: 900 }],
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: viewports.map(([name, viewport]) => ({
    name,
    use: { viewport },
  })),
  webServer: {
    command: 'pnpm exec vite --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
  },
});
