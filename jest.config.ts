import { type JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  rootDir: "./",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/test/**/*.test.ts", "**/test/tests.ts"],
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["/node_modules/", "./test"],
  extensionsToTreatAsEsm: [".ts"],
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "test-results/jest" }],
  ],
  coverageReporters: ["lcov", "text", "text-summary"],
  setupFiles: [],
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      { useESM: true, tsconfig: "./tsconfig.test.json" },
    ],
  },
};

export default jestConfig;
