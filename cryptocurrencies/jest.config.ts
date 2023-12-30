const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  testPathIgnorePatterns: ['/dist/'],
  /**
   * Without this, importing Axios will throw an error during tests.
   */
  moduleNameMapper: { '^axios$': require.resolve('axios') },
}

export default config
