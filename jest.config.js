module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-dnd|dnd-core|@react-dnd|@hookform)'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary', 'text-lcov'],
  testResultsProcessor: "jest-sonar-reporter",
  sonarRunnerReporterOptions: {
    reportPath: "coverage/test-report.xml",
  reporters: [
    "default",
    [ "jest-junit", {
        outputDirectory: "coverage",
        outputName: "junit.xml",
        suiteName: "jest tests",
        classNameTemplate: "{classname}-{title}",
        titleTemplate: "{classname}:{title}"
      }
    ]
  ]  },
};