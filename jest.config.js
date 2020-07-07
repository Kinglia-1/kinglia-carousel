module.exports = {
  moduleNameMapper: { "\\.(css|less)$": "<rootDir>/styleMock.js"},
  setupFiles: [
      '<rootDir>/test/setupTests.js',
  ]
};