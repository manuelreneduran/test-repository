import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.js",
    coverage: {
      provider: "istanbul", // Use c8 for coverage
      reporter: ["text", "html"], // Output formats
      all: true, // Include files without tests
      include: ["src/**/*.{ts,tsx}"], // Include these files
      exclude: ["node_modules", "dist"], // Exclude these files
    },
  },
});
