import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],

  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};

export default createJestConfig(customJestConfig);