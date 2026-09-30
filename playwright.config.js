import { defineConfig } from "@playwright/test";

const BASE = "/The-Portfolio/"; // the GitHub Pages deploy base is the hardest path to get right
const PORT = 4173;

export default defineConfig({
  testDir: "e2e",
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}${BASE}`,
    // Set PW_CHROMIUM_PATH to reuse a locally installed Chromium instead of Playwright's download.
    launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH || undefined },
  },
  webServer: {
    command: `npx vite build --base=${BASE} --outDir dist-e2e && npx vite preview --base=${BASE} --outDir dist-e2e --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}${BASE}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
