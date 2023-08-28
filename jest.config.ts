import { type JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: ["**/test/**/*.test.ts", "**/test/tests.ts"],
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["/node_modules/", "./test"],
  reporters: ["default", ["jest-junit", { outputDirectory: "test-results/jest" }]],
  coverageReporters: ["lcov", "text", "text-summary"],
};

export default jestConfig;
