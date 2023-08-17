import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "istanbul",
    },
  },
});
