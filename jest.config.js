module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Để mô phỏng các file CSS module
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
};
