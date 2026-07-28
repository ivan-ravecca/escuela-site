/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: ".htaccess",
          dest: ".",
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  server: {
    port: 5173, // Change this number to your desired port
    host: true, // This allows access from the local network
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/test/setupTests.ts"],
    css: true,
    environmentOptions: {
      jsdom: {
        url: "http://localhost:5173",
      },
    },
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "src/helpers/**/*.{ts,tsx}",
        "src/hooks/**/*.{ts,tsx}",
        "src/contexts/**/*.{ts,tsx}",
        "src/interceptors/**/*.{ts,tsx}",
        "src/services/**/*.{ts,tsx}",
      ],
      exclude: [
        "src/**/*.d.ts",
        "src/main.tsx",
        "src/App.tsx",
        "src/hooks/**/*.test.{ts,tsx}",
        "src/contexts/**/*.test.{ts,tsx}",
        "src/interceptors/**/*.test.{ts,tsx}",
        "src/services/**/*.test.{ts,tsx}",
        "src/helpers/**/*.test.{ts,tsx}",
        "src/styles/**",
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        "src/hooks/useAssistant.ts": {
          lines: 80,
          statements: 80,
          functions: 90,
        },
        "src/contexts/AuthContext.tsx": {
          lines: 90,
          statements: 90,
          functions: 80,
        },
        "src/interceptors/apiClient.ts": {
          lines: 80,
          statements: 80,
          functions: 65,
        },
      },
    },
  },
});
