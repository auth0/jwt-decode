module.exports = {
    rootDir: './',
    moduleFileExtensions: ['js'],
    testMatch: ['**/test/**/*.test.js', '**/test/tests.js'],
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
    setupFiles: []
  };