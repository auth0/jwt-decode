module.exports = {
    rootDir: './',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/test/**/*.test.ts', '**/test/tests.ts'],
    coverageProvider: 'v8',
    coveragePathIgnorePatterns: [
      '/node_modules/',
      './jest.config.js',
      './test',
    ],
    reporters: [
      'default',
      ['jest-junit', { outputDirectory: 'test-results/jest' }]
    ],
    coverageReporters: ['lcov', 'text', 'text-summary'],
    setupFiles: [],
    preset: 'ts-jest',
    transform: {
      '^.+\\.ts?$': ['ts-jest', {tsconfig: './tsconfig.test.json'}]
    },
  };