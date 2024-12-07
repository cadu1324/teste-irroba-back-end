module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'], 
  testMatch: ['<rootDir>/test/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
};