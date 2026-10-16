import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "core",
    include: ["src/__tests__/**/*.test.ts"],
    globalSetup: ["./src/__tests__/setup/warm-fixtures.ts"],
  },
});
