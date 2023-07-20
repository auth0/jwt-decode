/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  rootDir: "./",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/test/**/*.test.ts", "**/test/tests.ts"],
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["/node_modules/", "./jest.config.js", "./test"],
  extensionsToTreatAsEsm: ['.ts'],
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "test-results/jest" }],
  ],
  coverageReporters: ["lcov", "text", "text-summary"],
  setupFiles: [],
  preset: 'ts-jest/presets/default-esm',
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      { useESM: true, tsconfig: "./tsconfig.test.json" },
    ],
  },
};
