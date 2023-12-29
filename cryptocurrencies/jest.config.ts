const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  testPathIgnorePatterns: ['/dist/'],
  moduleNameMapper: { '^axios$': require.resolve('axios') },
}

export default config
