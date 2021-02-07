module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  rootDir: "./codemods",
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {},
}
