const path = require('path');

module.exports = {
  verbose: true,
  moduleDirectories: ['node_modules', path.resolve(__dirname, 'src')],
  testPathIgnorePatterns: ['node_modules', '.git'],
  setupFilesAfterEnv: [
    'jest-styled-components',
    '@testing-library/jest-dom/extend-expect',
    'jest-axe/extend-expect',
  ],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!dist/src/**/*.js',
    '!**/src/test/**/*.js',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
